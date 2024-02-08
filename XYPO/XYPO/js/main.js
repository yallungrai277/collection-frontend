const menubtn = document.querySelector('.menu');
const navBar = document.querySelector('.nav-brand');
navBar.style.right = '-250px';
menubtn.addEventListener('click', () => {
  if (navBar.style.right == '-250px') {
    navBar.style.right = '0';
  } else {
    navBar.style.right = '-250px';
  }
});
