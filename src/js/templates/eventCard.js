const eventList = document.querySelector('.gallery');

const eventCardMarkup = events =>
  events
    .map(
      ({
        images,
        name,
        dates: {
          start: { localDate },
        },
        _embedded: {
          venues: [{ name: place }],
        },
      }) => {
        return `
    <li class="gallery__item"> 
        <img class="gallery__image" src=${images[0].url} alt=${name} />
        <div class="gallery__wrapper">
            <h3 class="gallery__subtitle">${name}</h3>
            <p class="gallery__text">${localDate}</p>   
            <p class="gallery__text gallery__text-location">
              ${place}
              </p>
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

export { renderMarkup };
