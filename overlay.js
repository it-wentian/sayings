window.api.getSayings();  // ✅ 不再 require fs 或 path

window.api.getSayings().then(sayings => {
  const sayingDiv = document.getElementById('sayingText');
  console.log(sayings);
  
  let lastText = '';

  function pickRandomSaying() {
    let text;
    do {
      const random = sayings[Math.floor(Math.random() * sayings.length)];
      text = `【${random.category}】${random.content}`;
    } while (text === lastText);
    lastText = text;
    return text;
  }

  function updateSaying() {
    sayingDiv.style.animation = 'none';
    void sayingDiv.offsetWidth;
    sayingDiv.textContent = pickRandomSaying();
    sayingDiv.style.animation = `scroll-left ${calculateDuration()}s linear`;
  }

  function calculateDuration() {
    const baseSpeed = 100;
    const width = sayingDiv.scrollWidth || 800;
    return Math.max(10, width / baseSpeed);
  }

  sayingDiv.addEventListener('animationend', updateSaying);
  updateSaying();
});
