import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const date = new Date();
let userSelectedDate = 0;

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

// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (date.getTime() >= selectedDates[0].getTime()) {
      window.alert("Please choose a date in the future")
    } else {
      userSelectedDate = selectedDates[0].getTime() - date.getTime();
    }
  }
}

const input = document.querySelector(`input[type="text"]`);

flatpickr(input, options);

const startTimer = document.querySelector(`button[type="button"]`);

const counter = () => {
  console.log(userSelectedDate)
  console.log(convertMs(userSelectedDate))
  userSelectedDate--;
}

const timerOn = () => {
  setInterval(counter, 1000);
}

startTimer.addEventListener("click", timerOn);