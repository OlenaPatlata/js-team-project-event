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
        _embedded: {
          venues: [{ name: place }],
        },
      }) => {
        // const standardImage = images.filter(
        //   ({ url, width, ratio }) =>
        //     url.toLowerCase().includes('tablet_landscape') &&
        //     width >= 640 &&
        //     width < 2040 &&
        //     ratio === '3_2',
        // )[0].url;

        // const retinaImage = images.filter(
        //   ({ url, width, ratio }) =>
        //     url.toLowerCase().includes('retina') && width >= 640 && ratio === '3_2',
        // )[0].url;

        return `
        <li class="gallery__item" data-id="${id}"> 
        <picture>
          <source
          srcset="
          ${images[0].url} 1x,
          ${images[0].url} 2x,
          " 
        />
        <img class="gallery__image" src=${images[0].url} alt=${name} />
        </picture>
        <div class="gallery__wrapper">
            <div class="gallery__marquee ">
              <h3 class="gallery__subtitle animated">${name}</h3>
            </div>
            <p class="gallery__text">${localDate}</p>   
            <div class="gallery__wrapper-inner ">
              <div class="gallery__svg"></div>
              <div class=" gallery__marquee">
                <p class="gallery__text gallery__text-location animated">
                ${place}
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

// function checkDeviceForSubtitle(el, className) {
//   if (window.innerWidth < 768) {
//     return checkLength(el, 15, className);
//   } else {
//     return checkLength(el, 20, className);
//   }
// }

// function checkDeviceForLocation(el, className) {
//   if (window.innerWidth < 768) {
//     return checkLength(el, 8, className);
//   } else {
//     return checkLength(el, 15, className);
//   }
// }

// function checkLength(el, num, className) {
//   return el.length > num ? className : '';
// }

export { renderMarkup };
