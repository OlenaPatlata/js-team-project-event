//Get the button:
scrollUp = document.getElementById('scroll_up');

// When the user scrolls down 180px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
    scrollUp.style.display = 'block';
  } else {
    scrollUp.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollUp.addEventListener('click', topFunction);
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
