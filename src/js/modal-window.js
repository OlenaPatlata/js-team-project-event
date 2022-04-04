import apiQuery from './ticketmasterAPI';

import makeOneEventMarkup from './one-event-modal';
import moreBtnFunc from './moreByAuthor';

import 'animate.css';

// получаем ссылку на бэкдроп
const backdropRef = document.querySelector(`[data-modal="event-one"]`);
// получаем ссылку на модалку
const modalRef = document.querySelector('.modal');
// получаем ссылку на галерею в которую рендерятся карточки событий
const eventListRef = document.querySelector('.gallery');
// получаем ссылку на кнопку закрытия модалки
const closeBtnRef = document.querySelector(`[data-modal-close="event-one"]`);
// получаем ссылку на div, в который рендерится модалка
const wrapperModalRef = document.querySelector('.modal__wrapper');

let dataEvent = {};
let btnMore = '';
let btnMoreRef = '';

// Функция для очищения разметки в модальном окне
function clearModal() {
  wrapperModalRef.innerHTML = '';
}

// Функция для сообщения пользователю об ошибке
const handleError = () => {
  console.log(1111);
};

// Функция для модального окна
async function onModalOpenClick(e) {
  eventListRef.removeEventListener('click', onModalOpenClick);
  const cardRef = e.target.closest('.gallery__item');
  if (e.target === e.currentTarget || !cardRef) {
    eventListRef.addEventListener('click', onModalOpenClick);
    return;
  }

  const id = cardRef.dataset.id;

  apiQuery.EvID = id;
  dataEvent = await apiQuery.getEventsID();

  wrapperModalRef.insertAdjacentHTML('beforeend', makeOneEventMarkup({ ...dataEvent }));

  openModal();

  btnMoreRef = document.querySelector('.btn--modal');
  btnMore = btnMoreRef.dataset.name;
  // console.log(btnMore);
  btnMoreRef.addEventListener('click', moreBtnFunc);
  // console.log(btnMore);

  closeBtnRef.addEventListener('click', closeModal);
  backdropRef.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscDown);
}
function openModal() {
  backdropRef.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  modalRef.classList.add('animate__animated');
  modalRef.classList.add('animate__pulse');
}

function closeModal() {
  backdropRef.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  modalRef.classList.remove('animate__animated');
  modalRef.classList.remove('animate__pulse');

  closeBtnRef.removeEventListener('click', onBtnClick);
  backdropRef.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscDown);
  btnMoreRef.removeEventListener('click', moreBtnFunc);
  clearModal();
  eventListRef.addEventListener('click', onModalOpenClick);
}
function onBackdropClick(e) {
  if (e.target !== backdropRef) return;
  closeModal();
}
function onEscDown(e) {
  if (e.code !== 'Escape') return;
  closeModal();
}
function onBtnClick(e) {
  if (e.code !== closeBtnRef) return;
  closeModal();
}

eventListRef.addEventListener('click', onModalOpenClick);

export { btnMore, closeModal };
