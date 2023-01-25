import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const inputCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");

const DEBOUNCE_DELAY = 300;

// inputCountry.addEventListener("change", () => {
//     fetch(`https://restcountries.com/v3.1/name/peru`);
// });

console.log('start');

// fetch(`https://jsonplaceholder.typicode.com/posts`, {
//     method: 'GET',
    
// })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.log("Error: ", error));

inputCountry.addEventListener("change", () => {
  fetchCountries()
    .then(countries => renderCountries(countries))
    // .then(countries => console.log(countries))
    .catch(error => console.log(error));
});

function fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/poland`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        }).catch(error => console.log("Error: ", error));
};

function renderCountries(countries) {
    const markup = countries
        .map((country) => {
          return `<li>
          <p><b>Name</b>: ${country.name.common}</p>
          <p><b>Flag</b>: <img src="${country.flags.svg}"/></p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Language</b>: ${country.languages}</p>
        </li>`;
        })
        .join("");
        countryList.innerHTML = markup;
}