const body = document.querySelector('body');

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let timerId = null;

stopButton.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {

    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    },1000);
    startButton.disabled = true;
    stopButton.disabled = false;

});

stopButton.addEventListener('click',() => {

    clearInterval(timerId);
    stopButton.disabled = true;
    startButton.disabled = false;

});
