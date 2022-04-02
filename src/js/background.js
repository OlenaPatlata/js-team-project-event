const eventList = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery-container');

function removeElement() {
  const galleryHeight = eventList.offsetHeight;

  if (galleryHeight === 0) {
    eventList.classList.add('remove-element');
    galleryContainer.classList.add('remove-element');
  }

  if (galleryHeight < 1000) {
    eventList.classList.remove('remove-element');
    galleryContainer.classList.remove('remove-element');
    eventList.classList.add('remove-element');
    galleryContainer.classList.add('remove-element');
    return;
  }

  eventList.classList.remove('remove-element');
  galleryContainer.classList.remove('remove-element');
}

export { removeElement };
