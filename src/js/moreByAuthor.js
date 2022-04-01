import apiQuery from './ticketmasterAPI';
import { renderMarkup } from './templates/eventCard';
import { btnMore, closeModal } from './modal-window';
// строку ниже удалить после слияния
import newAPIQuery from './newAPI';
import { paginationByEvents } from './pagination';

// заменить newAPIQuery на APIQuery после слияния
const APIeventsByKey = new newAPIQuery();
// строку ниже удалить посли слияния
// const moreBtn = document.querySelector('.more-btn');
// moreBtn.addEventListener('click', moreBtnFunc);

const refs = {
  valueInput: document.querySelector('.header__input'),
  fieldToClear: document.querySelector('.gallery'),
};

// это ОСНОВНАЯ ФУНКЦИЯ, заЭкспортить и подключить к нужной кнопке
export default async function moreBtnFunc() {
  // APIeventsByKey.eventKeyWord = btnMore;
  apiQuery.keyword = btnMore;
  apiQuery.currentPage = 0;
  refs.fieldToClear.innerHTML = '';
  closeModal();
  // try {
  //   const result = await APIeventsByKey.GetEventsByKeyWord();
  //   console.log('result:', result);
  //   const resultArray = result._embedded.events;
  //   const { name } = resultArray[0];
  //   // запись значения поиска в инпут
  //   refs.valueInput.value = name;

  //   renderMarkup(resultArray);
  // } catch (error) {
  //   console.log(error.message);
  // }

  try {
    const result = await apiQuery.search();
    console.log('result:', result);
    const resultArray = result._embedded.events;
    const { name } = resultArray[0];
    // запись значения поиска в инпут
    refs.valueInput.value = name;

    paginationByEvents(result.page);
    renderMarkup(resultArray);
  } catch (error) {
    console.log(error.message);
  }
}
