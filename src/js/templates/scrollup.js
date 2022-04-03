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

// scrolls.addEventListener('click', scrollFunction);
// function scrollFunction(e) {
//   console.log(e.currentTarget);
//   if (scrollUp) {
//     document.body.scrollTop = 0; // For Safari
//     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//   }
//   // if (scrollDown) {
//   //   footer.scrollIntoView();
//   // }
// }

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
