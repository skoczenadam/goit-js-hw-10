import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector("form");
const input = document.querySelector(`input[type="number"]`);
const fulfilled = document.querySelector(`input[value="fulfilled"]`);
const rejected = document.querySelector(`input[value="rejected"]`);

const formChecker = e => {
  e.preventDefault();
  const inputTime = input.value;
  if (fulfilled.checked) {
    setTimeout(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${inputTime}ms`,
        color: 'green',
        position: 'topRight'
      })
    }, inputTime);
  } else if (rejected.checked) {
    setTimeout(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${inputTime}ms`,
        color: 'red',
        position: 'topRight'
      })
    }, inputTime);
  }
  input.value = "";
  fulfilled.checked = false;
  rejected.checked = false;
}

form.addEventListener("submit", formChecker)