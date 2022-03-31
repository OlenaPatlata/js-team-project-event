import APIQuery from './ticketmasterAPI';
import { renderMarkup } from './templates/eventCard';
// import { btnMore } from './modal-window';
// строку ниже удалить после слияния
import newAPIQuery from './newAPI'; 

// заменить newAPIQuery на APIQuery после слияния
const APIeventsByKey = new newAPIQuery();
// строку ниже удалить посли слияния
const moreBtn = document.querySelector('.more-btn');
moreBtn.addEventListener('click', moreBtnFunc);

const refs = {
  valueInput: document.querySelector('#searchbar_js'),
  fieldToClear: document.querySelector('.gallery'),
}

// перед использованием функции необходимо изменить ключевое слово на btnMore
APIeventsByKey.eventKeyWord = 'killer';

// это ОСНОВНАЯ ФУНКЦИЯ, заЭкспортить и подключить к нужной кнопке
export default async function moreBtnFunc() {
  refs.fieldToClear.innerHTML = '';
  try {
    const result = await APIeventsByKey.GetEventsByKeyWord()
    console.log('result:', result);
    const resultArray = result._embedded.events;
    const {name} = resultArray[0];
    // запись значения поиска в инпут
    // refs.valueInput.value = name;

    renderMarkup(resultArray);

  } catch (error) {
    console.log(error.message);
  }
    
}


