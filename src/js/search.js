import apiQuery from './ticketmasterAPI'; //испорт апишки
import debounce from 'lodash.debounce'; //лодаш(дебаунс)
// var debounce = require('lodash.debounce');
import { displayWindowSize } from './windowChangeListener';
import { renderMarkup } from './templates/eventCard'; //импорт функции отрисовки
import { selectedCountry } from './persatyi-country-select'; //импорт переменной со значением страны
let search = document.getElementById('search'); //поиск елемента(инпута) по айди
search.addEventListener('input', debounce(listenToSearch, 250)); //добавление слушателя на инпут
displayWindowSize();

async function listenToSearch(a) {
  //   console.log(a.target.value);
  apiQuery.keyword = a.target.value.trim(); //установка поискового слова в запрос поиска
  console.log('selectedCountry: ', selectedCountry);
  try {
    const searchResult = await apiQuery.search(); //присвоение результатов запроса в переменную
    console.log('searchResult: ', searchResult);
    if (!searchResult._embedded) {
      //доп проверка на нежелательный результат
      //здесь можно поставить свою заплатку в случае если ничего не найдено
      return;
    }
    //console.log('searchResult: ', searchResult._embedded.events);
    renderMarkup(searchResult._embedded.events); //отрисовка карточек
    console.log('renderMarkup: ', renderMarkup);
  } catch (error) {
    console.log(error.message);
  }
}

// Attaching the event listener function to window's resize event
// window.addEventListener('resize', debounce(displayWindowSize, 1000));

// Calling the function for the first time
