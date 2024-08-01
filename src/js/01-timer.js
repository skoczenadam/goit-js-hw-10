import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector(`input[type="text"]`);
const startTimer = document.querySelector(`button[type="button"]`);
const daysTimer = document.querySelector(`span[data-days]`);
const hoursTimer = document.querySelector(`span[data-hours]`);
const minutesTimer = document.querySelector(`span[data-minutes]`);
const secondsTimer = document.querySelector(`span[data-seconds]`);

const date = new Date();
let userSelectedDate = 0;
let diff = 0;
let timerInterval;

startTimer.disabled = true;

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    diff = date.getTime() >= selectedDates[0].getTime()
    if (diff) {
      startTimer.disabled = true;
      iziToast.show({
        message: "Please choose a date in the future",
        color: 'red',
        position: 'topRight'
      })
    } else {
      startTimer.disabled = false;
      userSelectedDate = selectedDates[0].getTime() - date.getTime();
    }
  }
}

flatpickr(input, options);

const addLeadingZero = (value) => {
  return value.toString().padStart(2, "0")
}

const counter = () => {
  if (userSelectedDate < 1000) {
    clearInterval(timerInterval);
  }
  userSelectedDate -= 1000;
  const days = addLeadingZero(convertMs(userSelectedDate).days);
  const hours = addLeadingZero(convertMs(userSelectedDate).hours);
  const minutes = addLeadingZero(convertMs(userSelectedDate).minutes);
  const seconds = addLeadingZero(convertMs(userSelectedDate).seconds);
  
  daysTimer.textContent = days;
  hoursTimer.textContent = hours;
  minutesTimer.textContent = minutes;
  secondsTimer.textContent = seconds;
}

const timerOn = () => {
  startTimer.disabled = true;
  timerInterval = setInterval(counter, 1000);
}

startTimer.addEventListener("click", timerOn);