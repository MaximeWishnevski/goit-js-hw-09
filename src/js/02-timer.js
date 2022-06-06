import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     
      buttonEl.addEventListener('click', onStartTimer);
      function onStartTimer() {
      const selectedDate = selectedDates[0].getTime();
      const currentDate = Date.now();
      if (currentDate > selectedDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
        return;
        }
        Notiflix.Notify.success('Timer started');
        buttonEl.setAttribute('disabled', true);
        const intervalId = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = selectedDate - currentDate;
        if (deltaTime < 1000) {
            clearInterval(intervalId);
  
          };
        
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          updateFaceTimer(days, hours, minutes, seconds);
    
        }, 1000)
  }
    },
  };

  function updateFaceTimer(days, hours, minutes, seconds) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;
  }
  
  flatpickr(inputEl, options);