import APIQuery from './ticketmasterAPI';
import {renderMarkup} from './templates/eventCard';
// строку ниже удалить после слияния
import newAPIQuery from './newAPI'; 

// заменить newAPIQuery на APIQuery после слияния
const APIeventsByKey = new newAPIQuery();
// строку ниже удалить посли слияния
const moreBtn = document.querySelector('.more-btn');
moreBtn.addEventListener('click', MORE_BTN_FUNC);

// заменить привязку к рабочему инпуту
const valueInput = document.querySelector('.searchbar');
// это новый список для рендеринга карточек
// const authorList = document.querySelector('.gallery');
// заменить привязку к основному списку карточек
const fieldToClear = document.querySelector('.gallery');

// перед использованием функции необходимо изменить ключевое слово методом .eventKeyWord
APIeventsByKey.eventKeyWord = 'sting';

// это ОСНОВНАЯ ФУНКЦИЯ, заЭкспортить и подключить к нужной кнопке
export default async function MORE_BTN_FUNC() {
  fieldToClear.innerHTML = '';
  try {
    const result = await APIeventsByKey.GetEventsByKeyWord()
    console.log('result:', result);
    const resultArray = result._embedded.events;
    const { name, } = resultArray[0];
    // запись значения поиска в инпут
    // valueInput.value = name;

    renderMarkup(resultArray);

  } catch (error) {
    console.log(error.message);
  }
    
}



