const hamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElements = document.querySelectorAll('.has-fade');

hamburger.addEventListener('click', () => {
  if (header.classList.contains('open')) {
    header.classList.remove('open');
    fadeElements.forEach((element) => {
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
    body.classList.remove('no-scroll');
  } else {
    header.classList.add('open');
    fadeElements.forEach((element) => {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
    body.classList.add('no-scroll');
  }
});
