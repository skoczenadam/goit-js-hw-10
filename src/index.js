import './css/common.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const inputCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");

const DEBOUNCE_DELAY = 300;

console.log('start');

// fetch(`https://restcountries.com/v3.1/name/brasil`, {
//     method: 'GET',
    
// })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.log("Error: ", error));

inputCountry.addEventListener("input", debounce(() => {
  let countryName = inputCountry.value.trim();
  if (countryName == "") return countryList.innerHTML = "";
    fetchCountries(countryName)
      .then(countries => renderCountries(countries))
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name')
        });
}, DEBOUNCE_DELAY));

function renderCountries(countries) {
      if (countries.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
      } else if (countries.length >= 2) {
        const markup = countries
        .map((country) => {
          return `<li>
          <p><img src="${country.flags.svg}"/><span>${country.name.common}</span></p>
        </li>`;
        }).join("");
  
        countryList.innerHTML = markup;
      } else {
        const markup = countries
        .map((country) => {
          const countryLang = Object.values(country.languages);
          return `<li>
          <h1><img src="${country.flags.svg}"/><span>${country.name.common}</span></h1>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${countryLang}</p>
        </li>`;
        }).join("");
  
        countryList.innerHTML = markup;
      }
}