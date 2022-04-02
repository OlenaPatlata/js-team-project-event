const pagination = document.querySelector('#pagination');
export default {
  hide() {
    pagination.classList.add('is-hidden');
  },
  show() {
    pagination.classList.remove('is-hidden');
  },
};
