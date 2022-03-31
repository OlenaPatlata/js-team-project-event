import API from './ticketmasterAPI'; //испорт апишки
var debounce = require('lodash.debounce'); //лодаш(дебаунс)
var throttle = require('lodash.throttle'); //лодаш(тротл)
import { displayWindowSize } from './windowChangeListener';
import { renderMarkup } from './templates/eventCard'; //импорт функции отрисовки
import { selectedCountry } from './persatyi-country-select'; //импорт переменной со значением страны
const APIinstance = new API(); //новый екземпляр класса
let search = document.getElementById('search'); //поиск елемента(инпута) по айди
search.addEventListener('input', debounce(listenToSearch, 250)); //добавление слушателя на инпут
displayWindowSize();

async function listenToSearch(a) {
  //   console.log(a.target.value);
  APIinstance.keyword = a.target.value.trim(); //установка поискового слова в запрос поиска
  APIinstance.country = selectedCountry; //установка страны для поиска
  console.log('selectedCountry: ', selectedCountry);
  try {
    const searchResult = await APIinstance.search(); //присвоение результатов запроса в переменную
    if (!searchResult._embedded) {
      //доп проверка на нежелательный результат
      //здесь можно поставить свою заплатку в случае если ничего не найдено
      return;
    }
    //console.log('searchResult: ', searchResult._embedded.events);
    renderMarkup(searchResult._embedded.events); //отрисовка карточек
  } catch (error) {
    console.log(error.message);
  }
}

// Attaching the event listener function to window's resize event
window.addEventListener('resize', debounce(displayWindowSize, 1000));

// Calling the function for the first time
