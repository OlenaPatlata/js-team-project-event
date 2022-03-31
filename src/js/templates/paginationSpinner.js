const containerPagination = document.querySelector('.container_pagination');
export default {
  spinner: containerPagination.querySelector('.spinner'),
  pagination: containerPagination.querySelector('#pagination'),
  show() {
    this.spinner.classList.remove('is-hidden');
    this.pagination.classList.add('is-hidden');
  },
  hide() {
    this.spinner.classList.add('is-hidden');
    this.pagination.classList.remove('is-hidden');
  },
};
