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
const authorList = document.querySelector('.author__list');
// заменить привязку к основной странице
const fieldToClear = document.querySelector('.example');
// перед использованием функции необходимо изменить ключевое слово методом .eventKeyWord
APIeventsByKey.eventKeyWord = 'sting';
// это ОСНОВНАЯ ФУНКЦИЯ, заЭкспортить и подключить к нужной кнопке
export default async function MORE_BTN_FUNC() {
    fieldToClear.innerHTML = '';
    const result = await APIeventsByKey.GetEventsByKeyWord()
    console.log('testA:', result);
    const resultArray = result._embedded.events;
    const {name, url, images, dates, _embedded } = resultArray[0];
    valueInput.value = name;

    const markup = resultArray.map(({ name, url, images, dates, _embedded }) => {
        return `<li class="author__item">
      <div class="back-border"></div>
      <div class="author__item-card" style="width: 180px">
        <a href="${url}">
          <picture>
            <source
              srcset="
                ${images[5].url} 1x
              "
              media="(min-width:1200px)"
            />
            <source
              srcset="
                https://s1.ticketm.net/dam/a/da7/085e9630-9347-4af4-8762-3adb37925da7_1574381_CUSTOM.jpg 1x
              "
              media="(min-width:768px)"
            />
            <source
              srcset="
                https://s1.ticketm.net/dam/a/da7/085e9630-9347-4af4-8762-3adb37925da7_1574381_CUSTOM.jpg 1x
              "
              media="(min-width:320px)"
            />
            <img src="" alt="example" />
          </picture>
          <p class="name">${name}</p>
          <p class="date">${dates.start.localDate}</p>
          <p class="location">${_embedded.venues[0].city.name}</p>
        </a>
      </div>
    </li>`
    }).join("");
    authorList.insertAdjacentHTML("beforebegin", markup);

    
}



