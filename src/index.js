import './css/common.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const inputCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");

const DEBOUNCE_DELAY = 300;

console.log('start123');

// fetch(`https://restcountries.com/v3.1/name/brasil`, {
//     method: 'GET',
    
// })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.log("Error: ", error));

inputCountry.addEventListener("input", () => {
    let countryName = inputCountry.value
    fetchCountries(countryName)
      .then(countries => renderCountries(countries))
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure('Oops, there is no country in this name');
        });
});

function renderCountries(countries) {
    const markup = countries
        .map((country) => {
        const countryLang = Object.values(country.languages);
          return `<li>
          <p><b>Name</b>: ${country.name.common}</p>
          <p><b>Flag</b>: <img src="${country.flags.svg}"/></p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Languages</b>: ${countryLang}</p>
          <p><b>Population</b>: ${country.population}</p>
        </li>`;
        })
        .join("");
        countryList.innerHTML = markup;
}