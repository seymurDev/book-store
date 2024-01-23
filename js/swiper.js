import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 60,
    centerSlide:true,
    fade:true,
    breakpoints:{
        0:{
            slidesPerView:1
        },
        450:{
            slidesPerView:2,
            spaceBetween: 50,
        },
        600:{
            slidesPerView:3,
            spaceBetween: 60,
        },
        750:{
            slidesPerView:3,
            spaceBetween: 30,
        },
        880:{
            slidesPerView:4,
            spaceBetween: 20,
        },
        1300:{
            slidesPerView:5,
            spaceBetween: 40,
        },
    },
    loop:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });