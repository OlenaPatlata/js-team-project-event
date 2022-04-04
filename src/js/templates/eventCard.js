const eventList = document.querySelector('.gallery');

const eventCardMarkup = events =>
  events
    .map(
      ({
        images,
        name,
        id,
        dates: {
          start: { localDate },
        },
        _embedded,
      }) => {
        // Изображение для обычных экранов
        const standardImage = images.filter(
          ({ url, width, ratio }) =>
            !url.toLowerCase().includes('retina') && width < 700 && ratio === '3_2',
        )[0]?.url;

        // Изображение для Retina экранов
        const retinaImage = images.filter(
          ({ url, width, ratio }) =>
            url.toLowerCase().includes('retina') && width >= 640 && ratio === '3_2',
        )[0]?.url;

        // Проверка на наличие свойств
        const isVenuesTrue = _embedded?.venues[0]?.name;
        const eventName = name || 'See more info';
        const location = isVenuesTrue || 'Click on me to see mo info';

        return `
        <li class="gallery__item" data-id="${id}"> 
        <picture>
          <source
          srcset="
          ${standardImage || images[0].url} 1x,
          ${retinaImage || images[0].url} 2x,
          " 
        />
        <img class="gallery__image" src=${standardImage || images[0].url} 
        alt=${eventName}
        loading="lazy" 
        />
        </picture>
        <div class="gallery__wrapper">
            <div class="gallery__marquee ">
              <h3 class="gallery__subtitle ${checkDeviceForSubtitle(
                eventName,
                'animated',
              )}">${eventName}</h3>
            </div>
            <p class="gallery__text">${localDate}</p>   
            <div class="gallery__wrapper-inner ">
              <div class="gallery__svg"></div>
              <div class=" gallery__marquee">
                <p class="gallery__text gallery__text-location ${checkDeviceForLocation(
                  location,
                  'animated',
                )}">
                ${location}
                </p>
              </div>
            </div>
        </div>
    </li>
    `;
      },
    )
    .join('');

const renderMarkup = events => {
  eventList.innerHTML = '';
  const markup = eventCardMarkup(events);
  eventList.insertAdjacentHTML('beforeend', markup);
};

// Проверяет длинну строки названия события в зависимости от ширины экрана
function checkDeviceForSubtitle(el, className) {
  if (window.innerWidth < 768) {
    return checkLength(el, 15, className);
  } else {
    return checkLength(el, 20, className);
  }
}

// Проверяет длинну строки названия локиции в зависимости от ширины экрана
function checkDeviceForLocation(el, className) {
  if (window.innerWidth < 768) {
    return checkLength(el, 8, className);
  } else {
    return checkLength(el, 15, className);
  }
}

// Функция для проверки длинны строки и возврата имени класса
function checkLength(el, num, className) {
  if (el.length > num) {
    return className;
  }
}

export { renderMarkup };
