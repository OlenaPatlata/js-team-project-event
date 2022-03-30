import API from './ticketmasterAPI';
import { renderMarkup } from './templates/eventCard';

const api = new API();

const refs = {
  loader: document.querySelector('.loader'),
  loaderDiv: document.querySelector('.gallery-container'),
};

async function renderGallery() {
  try {
    refs.loaderDiv.classList.add('on-loading');
    refs.loader.classList.remove('is-hiden');

    //Layout template for the tablet version
    // if (window.innerWidth > 767 && window.innerWidth < 1024) {
    //
    // } else {
    //
    // }

    const events = await api.GetEvents();
    renderMarkup(events._embedded.events);
    refs.loader.classList.add('is-hiden');
    refs.loaderDiv.classList.remove('on-loading');
  } catch (error) {
    console.log(error);
  }
}

renderGallery();
