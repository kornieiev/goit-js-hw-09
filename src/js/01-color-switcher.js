const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let setColor = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  setColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  disableBtn(false, true);
});

stopBtn.addEventListener('click', () => {
  clearInterval(setColor);
  disableBtn(true, false);
});

function disableBtn(argStop, argStart) {
  stopBtn.disabled = argStop;
  startBtn.disabled = argStart;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
