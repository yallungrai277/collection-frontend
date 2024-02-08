//FOR HAMBURGER MENU
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

//FOR TOGGLING IMAGES IN PRODUCT DETAILS PAGE
const mainImage = document.querySelector('.main-image');
const relImage = document.querySelectorAll('.rel-image');

//FOR LOGIN AND REGISTER TOGGLE
const loginspanBtn = document.querySelector('#login-span-btn');
const registerspanBtn = document.querySelector('#register-span-btn');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

//FOR HAMBURGER MENU
menuIcon.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
});

//FOR TOGGLING IMAGES IN PRODUCT DETAILS PAGE

const toggleImage = (image) => {
  image.addEventListener('click', () => {
    tempMainImageSrc = mainImage.src;
    mainImage.src = image.src;
    image.src = tempMainImageSrc;
  });
};

relImage.forEach((image) => {
  toggleImage(image);
});

//FOR LOGIN AND REGISTER TOGGLE

registerspanBtn.addEventListener('click', () => {
  registerspanBtn.classList.add('active');
  loginspanBtn.classList.remove('active');
  registerForm.classList.add('form-active');
  registerForm.classList.remove('form-deactive');
  loginForm.classList.add('form-deactive');
});

loginspanBtn.addEventListener('click', () => {
  loginspanBtn.classList.add('active');
  registerspanBtn.classList.remove('active');
  loginForm.classList.add('form-active');
  loginForm.classList.remove('form-deactive');
  registerForm.classList.add('form-deactive');
});
