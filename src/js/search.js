import apiQuery from './ticketmasterAPI'; //испорт апишки
import debounce from 'lodash.debounce'; //лодаш(дебаунс)
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// var debounce = require('lodash.debounce');
import { displayWindowSize } from './windowChangeListener';
import { renderMarkup } from './templates/eventCard'; //импорт функции отрисовки
import { paginationByEvents } from './pagination';
import pageShowHide from './templates/paginationShowHide';
import { removeElement } from './background';
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
  apiQuery.currentPage = 0;
  try {
    // Инициализация спинера
    refs.gallery.innerHTML = '';
    removeElement();
    refs.loaderDiv.classList.add('on-loading');
    removeElement();
    refs.loader.classList.remove('is-hiden');

    const searchResult = await apiQuery.search(); //присвоение результатов запроса в переменную
    // console.log('searchResult: ', searchResult);

    if (!searchResult._embedded) {
      refs.loader.classList.add('is-hiden');
      removeElement();
      Notify.info('Sorry, there are no events on your request.');
      //доп проверка на нежелательный результат
      //здесь можно поставить свою заплатку в случае если ничего не найдено
      pageShowHide.hide();
      refs.loader.classList.add('is-hiden');
      return;
    }
    //console.log('searchResult: ', searchResult._embedded.events);
    renderMarkup(searchResult._embedded.events); //отрисовка карточек
    removeElement();
    paginationByEvents(searchResult.page);
    pageShowHide.show();
    // console.log('renderMarkup: ', renderMarkup);

    // Прячем спинер
    refs.loader.classList.add('is-hiden');
    refs.loaderDiv.classList.remove('on-loading');
  } catch (error) {
    refs.loader.classList.add('is-hiden');
    Notify.warning('Oops, something went wrong...');
    console.log(error.message);
  }
}

// Attaching the event listener function to window's resize event
// window.addEventListener('resize', debounce(displayWindowSize, 1000));

// Calling the function for the first time
