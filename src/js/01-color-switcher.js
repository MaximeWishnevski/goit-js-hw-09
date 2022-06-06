const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

let timerId = null;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartClick() {
   timerId = setInterval(() => {
        const bodyColor = getRandomHexColor();
       refs.body.style.backgroundColor = bodyColor;
       refs.startBtn.disabled = true;
       refs.stopBtn.disabled = false;
  }, 1000);
};

function onStopClick() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    };
