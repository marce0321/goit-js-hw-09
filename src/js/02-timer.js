
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const dateTimePicker = document.querySelector('#datetime-picker');
const btnStartCountdown = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let getDateTime = new Date();
let differenceBetweenDates = 0;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getDateTime = selectedDates[0].getTime(); 
    if (getDateTime < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStartCountdown.removeAttribute('disabled');
    }
  },
};

flatpickr(dateTimePicker, options);


const disableButton = () => {
  btnStartCountdown.setAttribute('disabled', true);
};
disableButton();

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


const addLeadingZero = value => {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  }
  return `${value}`;
};


const countdownTimer = () => {
  disableButton();
  const currentDate = new Date().getTime(); //Variable que contiene la fecha actual
  differenceBetweenDates = getDateTime - currentDate;
  if (getDateTime <= currentDate) {
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(differenceBetweenDates);
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
  setTimeout(() => {
    countdownTimer();
  }, 1000);
};


btnStartCountdown.addEventListener('click', countdownTimer);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
/**
 * Selector del contenedor del conteo regresivo
 */
const containerCountdown = document.querySelector('.timer');
/**
 * Selector contenedores de los elementos fecha y hora
 */
const styleContainers = document.getElementsByClassName('field');
/**
 * Selector de los elemenos numericos 00
 */
const styleNumbers = document.querySelectorAll('.value');
/**
 * Selector de los elementos Days, Hours, Minutes, Seconds
 */
const styleStrings = document.querySelectorAll('.label');

document.body.style.background = 'white';
containerCountdown.style.border = '2px solid black';
containerCountdown.style.borderRadius = '5px';
containerCountdown.style.width = '600px';
containerCountdown.style.marginTop = '25px';
containerCountdown.style.padding = '10px';
containerCountdown.style.display = 'flex';
containerCountdown.style.gap = '20px';
containerCountdown.style.justifyContent = 'center';
for (const container of styleContainers) {
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
}

for (const styleNumber of styleNumbers) {
  styleNumber.style.fontSize = '40px';
  styleNumber.style.fontFamily = 'Roboto, sans-serif';
  styleNumber.style.color = 'black';
}

for (const styleString of styleStrings) {
  styleString.style.textTransform = 'uppercase';
  styleString.style.fontWeight = 'bold';
  styleString.style.fontSize = '30px';
  styleString.style.fontFamily = 'Roboto, sans-serif';
  styleString.style.color = 'red';
}