import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector("form");
const input = document.querySelector(`input[type="number"]`);
const fulfilled = document.querySelector(`input[value="fulfilled"]`);
const rejected = document.querySelector(`input[value="rejected"]`);

const reset = () => {
  input.value = "";
  fulfilled.checked = false;
  rejected.checked = false;
};

let radio;

const promiseChecker = (isFulfilled, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          color: 'green',
          position: 'topRight'
        }));
      } else {
        reject(iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          color: 'red',
          position: 'topRight'
        }))
      };
    }, delay)
  });
}

const formChecker = e => {
  e.preventDefault();
  if (fulfilled.checked) {
    radio = true;
  } else {
    radio = false;
  }
  promiseChecker(radio, input.value);
  reset();
}

form.addEventListener("submit", formChecker)