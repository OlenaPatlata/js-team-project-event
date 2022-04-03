const eventList = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery-container');

function removeElement() {
  const galleryHeight = eventList.offsetHeight;

  if (galleryHeight === 0) {
    addClass();
  }

  if (galleryHeight < 1000) {
    addClass();
    return;
  }

  eventList.classList.remove('remove-element');
  galleryContainer.classList.remove('remove-element');
}

function addClass() {
  eventList.classList.add('remove-element');
  galleryContainer.classList.add('remove-element');
}

export { removeElement };
