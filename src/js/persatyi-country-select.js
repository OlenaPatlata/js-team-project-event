import apiQuery from './ticketmasterAPI';
import { renderMarkup } from './templates/eventCard';
import refs from './eventGallery'; //импорт ссылок на элементы для спинера
import 'animate.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { paginationByEvents } from './pagination';
import pageShowHide from './templates/paginationShowHide';
import { removeElement } from './background';

const list = {
  US: 'United States Of America',
  AD: 'Andorra',
  AI: 'Anguilla',
  AR: 'Argentina',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BB: 'Barbados',
  BE: 'Belgium',
  BM: 'Bermuda',
  BR: 'Brazil',
  BG: 'Bulgaria',
  CA: 'Canada',
  CL: 'Chile',
  CN: 'China',
  CO: 'Colombia',
  CR: 'Costa Rica',
  HR: 'Croatia',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EE: 'Estonia',
  FO: 'Faroe Islands',
  FI: 'Finland',
  FR: 'France',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GB: 'Great Britain',
  GR: 'Greece',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  IE: 'Ireland',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  KR: 'Korea, Republic of',
  LV: 'Latvia',
  LB: 'Lebanon',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MY: 'Malaysia',
  MT: 'Malta',
  MX: 'Mexico',
  MC: 'Monaco',
  ME: 'Montenegro',
  MA: 'Morocco',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NZ: 'New Zealand',
  ND: 'Northern Ireland',
  NO: 'Norway',
  PE: 'Peru',
  PL: 'Poland',
  PT: 'Portugal',
  RO: 'Romania',
  RU: 'Russian Federation',
  LC: 'Saint Lucia',
  SA: 'Saudi Arabia',
  RS: 'Serbia',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  ZA: 'South Africa',
  ES: 'Spain',
  SE: 'Sweden',
  CH: 'Switzerland',
  TW: 'Taiwan',
  TH: 'Thailand',
  TT: 'Trinidad and Tobago',
  TR: 'Turkey',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  UY: 'Uruguay',
  VE: 'Venezuela',
};

Notify.init({
  timeout: 3000,
  fontFamily: 'Montserrat',
  fontSize: '14px',
  cssAnimationStyle: 'from-top',
  fontAwesomeIconSize: '50px',
  info: {
    background: 'rgba(128, 128, 128, 0.8)',
    textColor: '#dc56c5',
    notiflixIconColor: '#dc56c5',
    childClassName: 'notiflix-notify-info',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
  warning: {
    background: 'rgba(128, 128, 128, 0.8)',
    textColor: 'rgb(134, 23, 23)',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgb(134, 23, 23)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

const dropdown = document.querySelector('.options-container');
const selected = document.querySelector('[data-selected-country]');
const searchBoxInput = document.querySelector('.search-box input');
const arrow = document.querySelector('#arrow');
const searchIcon = document.querySelector('#search-box__icon');

const keysOfCountries = Object.keys(list);
let markup = keysOfCountries
  .map(
    code => `<div class="option">
    <input type="radio" class="radio" id="${code}" value="${code}" name="category">
    <label class="option-label" for="${code}">${list[code]}</label>
    </div>`,
  )
  .join('');

dropdown.insertAdjacentHTML('beforeend', markup);
searchBoxInput.addEventListener('keyup', inputValue);
dropdown.addEventListener('change', selectCountry);

selected.addEventListener('click', () => {
  document.addEventListener('click', closeDropdownByClick);
  arrow.classList.toggle('active');
  searchBoxInput.classList.toggle('active');
  searchIcon.classList.toggle('active');
  dropdown.classList.toggle('active');

  searchBoxInput.value = '';
  filterList('');

  if (dropdown.classList.contains('active')) {
    searchBoxInput.focus();
  }
});

const optionsList = document.querySelectorAll('.option');

async function selectCountry(e) {
  try {
    const countryCode = e.target.value;
    selected.textContent = list[countryCode] || 'Around the world';
    apiQuery.country = countryCode;
    apiQuery.currentPage = 0;
    hideCountryDropdown();

    // Инициализация спинера
    refs.gallery.innerHTML = '';
    refs.loaderDiv.classList.add('on-loading');
    removeElement();
    refs.loader.classList.remove('is-hiden');

    const searchResult = await apiQuery.search();

    if (!searchResult._embedded) {
      Notify.info('Unfortunately nothing found, please try to choose another country.');
      refs.loader.classList.add('is-hiden');
      pageShowHide.hide();
      removeElement();
      return;
    }

    renderMarkup(searchResult._embedded.events);
    removeElement();
    paginationByEvents(searchResult.page);
    pageShowHide.show();
    // Прячем спиннер
    refs.loader.classList.add('is-hiden');
    refs.loaderDiv.classList.remove('on-loading');
  } catch (error) {
    Notify.warning('Oops, something went wrong...');
    removeElement();
    console.log(error.message);
    refs.loader.classList.add('is-hiden');
  }
}

function closeDropdownByClick(e) {
  if (
    dropdown.classList.contains('active') &&
    e.target !== selected &&
    e.target !== searchBoxInput
  ) {
    hideCountryDropdown();
    return;
  }
}

function hideCountryDropdown() {
  document.removeEventListener('click', closeDropdownByClick);
  searchIcon.classList.remove('active');
  arrow.classList.remove('active');
  dropdown.classList.remove('active');
  searchBoxInput.classList.remove('active');
}

function inputValue(e) {
  filterList(e.target.value);
}

function filterList(searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) !== -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
}

export { hideCountryDropdown };
