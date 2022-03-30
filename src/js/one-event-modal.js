// Функция создающая разметку для одного события
export default function makeOneEventMarkup(dataEvent) {
  const { info, dates, name, priceRanges, _embedded } = dataEvent;
  //   const poster = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : notFoundImg;
  //   const poster2x = poster_path
  //     ? `https://image.tmdb.org/t/p/w500${poster_path}`
  //     : notFoundImgRetina;
  //   const posterBig = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : notFoundImgBig;
  //   const posterBig2x = poster_path
  //     ? `https://image.tmdb.org/t/p/w780${poster_path}`
  //     : notFoundImgBigRetina;

  return `<div class="round__wrapper">
  <picture>
    <source srcset="${poster} 1x, ${poster2x} 2x" media="(max-width:1023px)" />
    <source srcset="${posterBig} 1x, ${posterBig2x} 2x" media="(min-width:1024px)" />
    <img class="round__img" alt="${title}" src="${poster}" loading="lazy" />
  </picture>
</div>
<div class="modal__content">
  <div class="poster__wrapper">
    <picture>
      <source srcset="${poster} 1x, ${poster2x} 2x" media="(max-width:1023px)" />
      <source srcset="${posterBig} 1x, ${posterBig2x} 2x" media="(min-width:1024px)" />
      <img class="poster__img" alt="${title}" src="${poster}" loading="lazy" />
    </picture>
  </div>
  <div class="event">
    <ul class="event__list">
      <li class="event__item">
        <h3 class="event__item--title uppercase">INFO</h3>
        <p class="event__item--info">${info}</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">WHEN</h3>
        <p class="event__item--info">${dates.start.localDate}</p>
        <p class="event__item--info">${dates.start.localtime} (${dates.timezone})</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">WHERE</h3>
        <p class="event__item--info">${_embedded.venues[0].city.name},${_embedded.venues[0].country.name}</p>
        <p class="event__item--info">${_embedded.venues[0].address.line1}</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">WHO</h3>
        <p class="event__item--info">${name}</p>
      </li>
      <li class="event__item">
        <h3 class="event__item--title uppercase">PRICES</h3>
        <p class="event__item--info">
          ${priceRanges[0].type} ${priceRanges[0].min}-${priceRanges[0].max}
          ${priceRanges[0].currency}
        </p>
        <a href="" class="event__item--link uppercase" rel="nofollow noopener noreferrer"
          >BUY TICKETS</a
        >
        <p class="event__item--info">
          ${priceRanges[1].type} ${priceRanges[1].min}-${priceRanges[1].max}
          ${priceRanges[1].currency}
        </p>
        <a href="" class="event__item--link uppercase" rel="nofollow noopener noreferrer"
          >BUY TICKETS</a
        >
      </li>
    </ul>
  </div>
</div>
<div class="event__btn button__container">
  <button type="button" class="btn--modal uppercase" data-btn="more">MORE FROM THIS AUTHOR</button>
</div>
    `;
}
