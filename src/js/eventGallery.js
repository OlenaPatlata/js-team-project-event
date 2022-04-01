import apiQuery from './ticketmasterAPI';
import { renderMarkup } from './templates/eventCard';
import { displayWindowSize } from './windowChangeListener';
import { paginationByEvents } from './pagination';

const refs = {
  loader: document.querySelector('.loader'),
  loaderDiv: document.querySelector('.gallery-container'),
  gallery: document.querySelector('.gallery'),
};

async function renderGallery() {
  try {
    refs.loaderDiv.classList.add('on-loading');
    refs.loader.classList.remove('is-hiden');

    displayWindowSize();

    const events = await apiQuery.getEvents();
    renderMarkup(events._embedded.events);

    refs.loader.classList.add('is-hiden');
    refs.loaderDiv.classList.remove('on-loading');

    paginationByEvents(events.page);
  } catch (error) {
    console.log(error);
  }
}

renderGallery();

export default refs;
