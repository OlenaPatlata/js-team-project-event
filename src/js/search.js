import apiQuery from './ticketmasterAPI'; //испорт апишки
import debounce from 'lodash.debounce'; //лодаш(дебаунс)
// var debounce = require('lodash.debounce');
import { displayWindowSize } from './windowChangeListener';
import { renderMarkup } from './templates/eventCard'; //импорт функции отрисовки

import refs from './eventGallery'; //импорт ссылок на элементы для спинера

let search = document.getElementById('search'); //поиск елемента(инпута) по айди
search.addEventListener('input', debounce(listenToSearch, 250)); //добавление слушателя на инпут
displayWindowSize();
let countrySearchContainer = document.querySelector('.options-container');
let countrySearchTriangle = document.querySelector('.header__custom-arrow');
let countrySearchQuery = document.getElementById('country-query');
let countrySearchIcon = document.querySelector('.search-box__icon');

async function listenToSearch(a) {
  //   console.log(a.target.value);
  if (countrySearchContainer.classList.contains('active')) {
    // console.log('found active state');
    countrySearchContainer.classList.remove('active');
    countrySearchTriangle.classList.remove('active');
    countrySearchQuery.classList.remove('active');
    countrySearchIcon.classList.remove('active');
  }
  apiQuery.keyword = a.target.value.trim(); //установка поискового слова в запрос поиска
  try {
    // Инициализация спинера
    refs.gallery.innerHTML = '';
    refs.loaderDiv.classList.add('on-loading');
    refs.loader.classList.remove('is-hiden');

    const searchResult = await apiQuery.search(); //присвоение результатов запроса в переменную
    // console.log('searchResult: ', searchResult);
    if (!searchResult._embedded) {
      //доп проверка на нежелательный результат
      //здесь можно поставить свою заплатку в случае если ничего не найдено
      return;
    }
    //console.log('searchResult: ', searchResult._embedded.events);
    renderMarkup(searchResult._embedded.events); //отрисовка карточек
    // console.log('renderMarkup: ', renderMarkup);

    // Прячем спинер
    refs.loader.classList.add('is-hiden');
    refs.loaderDiv.classList.remove('on-loading');
  } catch (error) {
    console.log(error.message);
  }
}

// Attaching the event listener function to window's resize event
// window.addEventListener('resize', debounce(displayWindowSize, 1000));

// Calling the function for the first time
