import apiQuery from './ticketmasterAPI';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { renderMarkup } from './templates/eventCard';

//=====================================================

const refs = {
  cards: document.querySelector('#example_render_films'),
  pagination: document.querySelector('#pagination'),
};
// console.log(refs.cards.querySelector('.cards'));

async function takeEvents(api) {
  //   api.currentSize = 3;

  const response = await api.getEvents();
  const events = response._embedded.events;

  renderMarkup(events);
  pagination(response.page);

  const last = refs.pagination.querySelector('.tui-ico-last');
  const totalItems = response.page.totalElements > 980 ? 980 : response.page.totalElements;

  const lastPage = Math.ceil(totalItems / response.page.size);

  last.textContent = lastPage;
  //   last.textContent = response.page.totalPages;
}

async function pagination({ size, totalElements }) {
  const options = {
    totalItems: totalElements > 980 ? 980 : totalElements,
    itemsPerPage: size,
    visiblePages: 3,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#"  class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '</span>',
      moreButton: '<a href="#"  class="tui-page-btn tui-{{type}}-is-ellip">' + '...' + '</a>',
    },
  };

  const pagination = new Pagination('pagination', options);

  const nextArrow = refs.pagination.querySelector('.tui-ico-next');
  nextArrow.innerHTML = `&#8594`;

  pagination.on('afterMove', async event => {
    const prevArrow = refs.pagination.querySelector('.tui-ico-prev');
    if (prevArrow) prevArrow.innerHTML = '&#8592';

    const currentPage = event.page;
    apiQuery.currentPage = currentPage;

    correctionPages(currentPage);

    const res = await apiQuery.getEvents();
    const events = res._embedded.events;

    renderMarkup(events);
  });
}

function correctionPages(currentPage) {
  const first = refs.pagination.querySelector('.tui-ico-first');
  // console.log(currentPage <= 5);
  if (first && currentPage <= 3) {
    first.style.display = 'none';
  } else if (first) {
    first.style.display = 'inline';
  }
  if (first) first.textContent = 1;
}

// function renderEvents(items) {
//   const list = refs.cards.querySelector('.cards');
//   list.innerHTML = '';

//   for (const item of items) {
//     list.innerHTML += `<li>
//         <img src="${item.images.map(image => image.url)[0]}" alt="">
//     </li>`;
//   }
//   //   console.log('qwe');
// }

takeEvents(apiQuery);
