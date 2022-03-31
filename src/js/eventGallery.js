import apiQuery from './ticketmasterAPI';
import { renderMarkup } from './templates/eventCard';
import { displayWindowSize } from './windowChangeListener';

const refs = {
  loader: document.querySelector('.loader'),
  loaderDiv: document.querySelector('.gallery-container'),
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
  } catch (error) {
    console.log(error);
  }
}

renderGallery();
