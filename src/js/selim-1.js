import APIQuery from './ticketmasterAPI';
// строку ниже удалить посли слияния
import newAPIQuery from './newAPI'; 
// заменить newAPIQuery на APIQuery после слияния
const APIeventsByKey = new newAPIQuery();
// строку ниже удалить посли слияния
const moreBtn = document.querySelector('.more-btn');
moreBtn.addEventListener('click', MORE_BTN_FUNC);
// заменить привязку к рабочему инпуту
const valueInput = document.querySelector('.example__input');

// перед использованием функции необходимо изменить ключевое слово методом .eventKeyWord
APIeventsByKey.eventKeyWord = 'sting';
// это ОСНОВНАЯ ФУНКЦИЯ, заЭкспортить и подключить к нужной кнопке
async function MORE_BTN_FUNC() {
    
    const result = await APIeventsByKey.GetEventsByKeyWord()
    console.log('testA:', result);
    const resultArray = result._embedded.events;
    const {name, url, images, dates, _embedded } = resultArray[0];
    valueInput.value = name;

}