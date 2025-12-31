const texts = ["modern websites", "responsive web apps", "creative solutions"];
let index = 0;
const typingSpan = document.querySelector(".typing");

function typeEffect() {
  const text = texts[index];
  let i = 0;
  typingSpan.textContent = "";
  const interval = setInterval(() => {
    typingSpan.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(() => {
        index = (index + 1) % texts.length;
        typeEffect();
      }, 2000);
    }
  }, 150);
}

typeEffect();
