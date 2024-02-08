const responsive = {
  0: {
    items: 1,
  },
  320: {
    items: 1,
  },
  560: {
    items: 2,
  },
  960: {
    items: 3,
  },
};

AOS.init();

$(document).ready(() => {
  $nav = $('.nav');
  $toggleCollapse = $('.toogle-collapse');

  // click event on toggle for navbar
  $toggleCollapse.on('click', () => {
    $nav.toggleClass('collapse');
  });

  //owl carousel for blog
  $('.owl-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    nav: true,
    navText: [
      $('.owl-navigation .owl-nav-prev'),
      $('.owl-navigation .owl-nav-next'),
    ],
    responsive: responsive,
  });

  // click to scroll top
  $('.move-up span').click(() => {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});
