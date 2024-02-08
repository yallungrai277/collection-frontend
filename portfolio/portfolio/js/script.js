// Animate on Scroll
AOS.init();

// Animations
const spans = document.querySelectorAll('h1 span');
spans.forEach((span) =>
  span.addEventListener('mouseover', () =>
    span.classList.add('animated', 'rubberBand')
  )
);
spans.forEach((span) =>
  span.addEventListener('mouseout', () =>
    span.classList.remove('animated', 'rubberBand')
  )
);



// Progress Bars
const htmlBar = document.querySelector('.bar-html');
const jsBar = document.querySelector('.bar-javascript');
const cssBar = document.querySelector('.bar-css');
const phpBar = document.querySelector('.bar-php');
const laravelBar = document.querySelector('.bar-laravel');
const sassBar = document.querySelector('.bar-sass');
const jqueryBar = document.querySelector('.bar-jquery');

let timeLine = new TimelineLite();

timeLine
  .fromTo(
    htmlBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  )
  .fromTo(
    jsBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  )
  .fromTo(
    cssBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  )
  .fromTo(
    phpBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  )
  .fromTo(
    laravelBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  )
  .fromTo(
    sassBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  )
  .fromTo(
    jqueryBar,
    0.75,
    {
      width: `calc(0% - 6px)`,
    },
    {
      width: `calc(90% - 6px)`,
      ease: Power4.easeOut,
    }
  );

const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  triggerElement: '.skills',
  triggerHook: 0,
})
  .setTween(timeLine)
  .addTo(controller);

// Work Javascript
const showRequiredCategory = (currentElement) => {
  const id = currentElement.id;
  const links = document.querySelectorAll('.work-category button');
  for (let i = 0; i < links.length; i++) {
    if (links[i].hasAttribute('class')) {
      links[i].classList.remove('active');
    }
  }

  currentElement.classList.add('active');
  const getCategory = document.querySelector(`.category-${id}`);
  const categories = document.querySelectorAll('.category');
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].hasAttribute('class')) {
      categories[i].classList.remove('animation-class');
      categories[i].classList.remove('show-category');
      categories[i].classList.add('hide-category');
    }
  }
  getCategory.classList.remove('hide-category');
  getCategory.classList.add('show-category');
  getCategory.classList.add('animation-class');
};

//Hamburger Javascript
const hamburgerMenu = document.querySelector('.hamburger');
const header = document.querySelector('header');
const body = document.querySelector('body');

hamburgerMenu.addEventListener('click', () => {
  if (header.classList.contains('open')) {
    header.classList.remove('open');
    body.classList.remove('h-overflow');
  } else {
    header.classList.add('open');
    body.classList.add('h-overflow');
  }
});

const links = document.querySelectorAll('nav ul li a');
links.forEach((link, index) => {
  link.addEventListener('click', () => {
    if (header.classList.contains('open')) {
      header.classList.remove('open');
    }
    if (body.classList.contains('h-overflow')) {
      body.classList.remove('h-overflow');
    }
  });
});
