//Get the button:
const search = document.querySelector('#search');
const footer = document.querySelector('.footer__section');
const scrolls = document.querySelector('#container_scrolls');
const scrollUp = scrolls.querySelector('#scroll_up');
const scrollDown = scrolls.querySelector('#scroll_down');

const bottomOfPage = window.innerHeight + window.screenY >= document.body.offsetHeight;

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    scrollDown.style.display = 'none';
  } else {
    scrollDown.style.display = 'block';
  }

  if (window.scrollY > 500) {
    scrollUp.style.display = 'block';
  } else {
    scrollUp.style.display = 'none';
  }
};

scrolls.addEventListener('click', scrollFunction);
function scrollFunction() {
  if (scrollUp) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  if (scrollDown) {
    footer.scrollIntoView();
  }
}

//=============================================
// When the user scrolls down 180px from the top of the document, show the button
// window.onscroll = function () {
//   scrollUpFunction();
//   scrollDownFunction();
// };

// function scrollUpFunction() {
//   if (document.body.scrollTop > 220 || document.documentElement.scrollTop > 220) {
//     scrollUp.style.display = 'block';
//   } else {
//     scrollUp.style.display = 'none';
//   }
// }
// function scrollDownFunction() {
//   if (bottomOfPage) {
//     scrollDown.style.display = 'none';
//   } else {
//     scrollDown.style.display = 'block';
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// scrolls.addEventListener('click', scrollFunction);
// function scrollFunction() {
//   if (scrollUp) {
//     document.body.scrollTop = 0; // For Safari
//     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//     console.log();
//   }
//   if (scrollDown) {
//     // footer.scrollTo();
//     console.log('hi');
//   }
// }
