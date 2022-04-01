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

async function paginationByEvents(page) {
  pagination(page);

  const last = refs.pagination.querySelector('.tui-ico-last');
  const totalItems = page.totalElements > 980 ? 980 : page.totalElements;

  const lastPage = Math.ceil(totalItems / page.size);

  if (last) last.textContent = lastPage;
}

async function pagination({ size, totalElements, totalPages }) {
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
  const lastPage = refs.pagination.querySelector('.tui-ico-last');

  if (lastPage && totalPages <= 3) lastPage.style.display = 'none';
  // const nextArrow = refs.pagination.querySelector('.tui-ico-next');
  // nextArrow.innerHTML = `&#8594`;

  pagination.on('afterMove', async event => {
    // const prevArrow = refs.pagination.querySelector('.tui-ico-prev');
    // if (prevArrow) prevArrow.innerHTML = '&#8592';

    const currentPage = event.page - 1;
    apiQuery.currentPage = currentPage;

    correctionPages(currentPage);

    // const res = await apiQuery.getEvents();
    const search = await apiQuery.search();

    const events = search._embedded.events;

    renderMarkup(events);
  });
}

function correctionPages(currentPage) {
  const first = refs.pagination.querySelector('.tui-ico-first');

  if (first && currentPage < 3) {
    first.style.display = 'none';
  } else if (first) {
    first.style.display = 'inline';
  }
  if (first) first.textContent = 1;
}

export { paginationByEvents };
