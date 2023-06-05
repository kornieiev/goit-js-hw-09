import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// тут получаем доступ к эллементам
const refs = {
  timeValues: document.querySelectorAll('.value'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let currentTime = null;
let setTime = null;
let intervalId = null;

let active = refs.startButton.disabled;
active = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setTime = selectedDates[0].getTime();
    currentTime = options.defaultDate.getTime();
    if (currentTime > setTime) {
      Notify.failure('Виберіть дату з майбутнього');
      active = true;
    }
    if (currentTime < setTime) {
      active = false;
    }
  },
};

refs.startButton.addEventListener('click', onStartClick);

const date = flatpickr('#datetime-picker', options);

function onStartClick() {
  Notify.success('Таймер встановлено');
  intervalId = setInterval(runTimer, 1000);
}

function stopInterval(deltaTime) {
  if (deltaTime < 1000) clearInterval(intervalId);
}

function runTimer() {
  const currentTime = Date.now();
  const deltaTime = setTime - currentTime;
  stopInterval(deltaTime);
  const convertTime = convertMs(deltaTime);
  console.log('convertTime', convertTime);
  changeHtmlValues(convertTime);
}

function pad(prop) {
  return String(prop).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

function changeHtmlValues({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}
