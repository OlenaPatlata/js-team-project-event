import apiQuery from './ticketmasterAPI';
import Pagination from 'tui-pagination';
import { renderMarkup } from './templates/eventCard';
import refsSpinner from './eventGallery';
import pageShowHide from './templates/paginationShowHide';
import { removeElement } from './background';

const refs = {
  cards: document.querySelector('#example_render_films'),
  pagination: document.querySelector('#pagination'),
};

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
    visiblePages: 5,
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
  if (nextArrow) {
    nextArrow.innerHTML = `&#8594`;
  }

  const lastPage = refs.pagination.querySelector('.tui-last');

  if (lastPage && totalPages <= 5) {
    lastPage.style.display = 'none';
  }
  pagination.on('afterMove', async event => {
    pageShowHide.hide();
    window.scrollTo({
      top: 150,
    });

    refsSpinner.gallery.innerHTML = '';
    refsSpinner.loaderDiv.classList.add('on-loading');
    removeElement();
    refsSpinner.loader.classList.remove('is-hiden');

    const currentPage = event.page - 1;
    apiQuery.currentPage = currentPage;

    checkFirstPage(currentPage);
    checkLastPage(currentPage, totalPages);

    const search = await apiQuery.search();
    const events = search._embedded.events;

    renderMarkup(events);
    removeElement();

    pageShowHide.show();
    refsSpinner.loader.classList.add('is-hiden');
    refsSpinner.loaderDiv.classList.remove('on-loading');

    const prevArrow = refs.pagination.querySelector('.tui-ico-prev');
    if (prevArrow) {
      prevArrow.innerHTML = `&#8594`;
    }
  });
}

function checkFirstPage(currentPage) {
  const first = refs.pagination.querySelector('.tui-first');

  if (first && currentPage < 5) {
    first.style.display = 'none';
  } else if (first) {
    first.style.display = 'inline';
  }
  if (first) first.textContent = 1;
}

function checkLastPage(currentPage, totalPages) {
  const lastPage = refs.pagination.querySelector('.tui-last');

  const paginationElements = refs.pagination.querySelectorAll('a').length;
  if ((paginationElements < 10 && currentPage > 6) || totalPages <= 5) {
    lastPage.style.display = 'none';
  } else {
    lastPage.style.display = 'inline';
  }
}

export { paginationByEvents };
