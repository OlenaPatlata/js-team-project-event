//Get the button:
const footer = document.querySelector('.footer__section');
const scrolls = document.querySelector('#container_scrolls');
const scrollUp = document.querySelector('.scroll_up');
const scrollDown = document.querySelector('.scroll_down');

window.onscroll = () => {
  if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
    scrollDown.classList.add('scroll_hide');
  } else {
    scrollDown.classList.remove('scroll_hide');
  }

  if (window.scrollY > 280) {
    scrollUp.classList.remove('scroll_hide');
  } else {
    scrollUp.classList.add('scroll_hide');
  }
};

// scrollUp.onclick = () => {
//   window.scrollTo(0, 0);
// };

// scrollDown.onclick = () => {
//   footer.scrollIntoView();
// };

scrollUp.addEventListener('click', eventfunction);
scrollDown.addEventListener('click', eventfunction);

function eventfunction(e) {
  if (e.currentTarget === scrollUp) {
    window.scrollTo(0, 0);
    return;
  }
  if (e.currentTarget === scrollDown) {
    footer.scrollIntoView();
    return;
  }
}
