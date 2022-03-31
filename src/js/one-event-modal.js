// Функция создающая разметку для одного события
export default function makeOneEventMarkup(dataEvent) {
  const {
    info,
    dates: {
      timezone,
      start: { localDate, localtime },
    },
    name,
    priceRanges,
    _embedded: { venues, attractions },
    images,
  } = dataEvent;
  const standardImage = images.filter(
    ({ url, width, ratio }) =>
      url.toLowerCase().includes('tablet_landscape') &&
      width >= 640 &&
      width < 2040 &&
      ratio === '3_2',
  )[0].url;

  const retinaImage = images.filter(
    ({ url, width, ratio }) =>
      url.toLowerCase().includes('retina') && width >= 640 && ratio === '3_2',
  )[0].url;

  return `<div class="round__wrapper">
  <picture>
    <source srcset="${standardImage ? standardImage : images[0].url} 1x,
          ${retinaImage ? retinaImage : images[0].url} 2x" class="round__img" />
        <img class="round__img" alt="${name}" src="${
    standardImage ? standardImage : images[0].url
  }" loading="lazy" />
  </picture>
</div>
<div class="modal__content">
  <div class="poster__wrapper">
    <picture>
    <source srcset="${standardImage ? standardImage : images[0].url} 1x,
          ${retinaImage ? retinaImage : images[0].url} 2x"  class="poster__img"/>
        <img class="poster__img" alt="${name}" src="${
    standardImage ? standardImage : images[0].url
  }" loading="lazy" />
  </picture>
  </div>
  <div class="event">
    <ul class="event__list">
      <li class="event__item">
        <h3 class="event__item--title uppercase">INFO</h3>
        <p class="event__item--info">${info ? info : attractions[0].name}</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">WHEN</h3>
        <p class="event__item--info">${localDate}</p>
        <p class="event__item--info">${localtime ? localtime : 'time unknown'} (${
    timezone ? timezone : 'timezone unknown'
  })</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">WHERE</h3>
        <p class="event__item--info">${venues[0].city.name},${venues[0].country.name}</p>
        <p class="event__item--info">${venues[0].address.line1}</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">WHO</h3>
        <p class="event__item--info">${name}</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">PRICES</h3>
        <div class="event__item--info"> ${
          priceRanges
            ? '<span class="event__item--bigicon"></span><span class="event__item--smallicon"></span><span class="event__item--bigicon"></span><span class="event__item--smallicon"></span><span class="event__item--smallicon"></span><span class="event__item--smallicon"></span><span class="event__item--bigicon"></span>' +
              priceRanges[0].type
            : 'Standart tickets missing'
        } ${priceRanges ? priceRanges[0].min + '-' : ' '}${priceRanges ? priceRanges[0].max : ' '}
          ${priceRanges ? priceRanges[0].currency : ' '}
        </div>
        <a href="" class="event__item--link uppercase" rel="nofollow noopener noreferrer"
          >BUY TICKETS</a
        >
        <div class="event__item--info">
          ${
            priceRanges?.[1]
              ? '<span class="event__item--bigicon"></span><span class="event__item--smallicon"></span><span class="event__item--bigicon"></span><span class="event__item--smallicon"></span><span class="event__item--smallicon"></span><span class="event__item--smallicon"></span><span class="event__item--bigicon"></span>' +
                priceRanges[1].type
              : 'VIP tickets missing'
          } ${priceRanges?.[1] ? priceRanges[1].min + '-' : ' '}${
    priceRanges?.[1] ? priceRanges[1].max : ' '
  }
          ${priceRanges?.[1] ? priceRanges[1].currency : ' '}
        </div>
        <a href="" class="event__item--link uppercase" rel="nofollow noopener noreferrer"
          >BUY TICKETS</a
        >
      </li>
    </ul>
  </div>
</div>
<div class="event__btn button__container">
  <button type="button" class="btn--modal uppercase"  data-name="${attractions[0].name ? attractions[0].name : ''}">MORE FROM THIS AUTHOR</button>
</div>
    `;
}
