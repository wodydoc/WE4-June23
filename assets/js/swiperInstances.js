document.addEventListener("DOMContentLoaded", function () {
    var swiperProcessors = new Swiper(".processors .swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      spaceBetween: 30,
      navigation: {
        nextEl: ".processors .swiper-button-next",
        prevEl: ".processors .swiper-button-prev",
      },
      pagination: {
        el: ".processors .swiper-pagination",
        clickable: true,
      },
      on: {
        init: function () {
          console.log("Swiper initialized!");
          gsap.fromTo(
            ".processors .swiper-slide",
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.inOut", stagger: 0.2 }
          );
        },
      },
    });
  
    var swiperStances = new Swiper(".stances .swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      spaceBetween: 30,
      navigation: {
        nextEl: ".stances .swiper-button-next",
        prevEl: ".stances .swiper-button-prev",
      },
      pagination: {
        el: ".stances .swiper-pagination",
        clickable: true,
      },
      on: {
        init: function () {
          console.log('init');
          gsap.fromTo(
            ".stances .swiper-slide",
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.inOut", stagger: 0.2 }
          );
          console.log('after gsap');
        },
      },
    });
  
    var swiperTypes = new Swiper(".types", {
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".types .swiper-button-next",
        prevEl: ".types .swiper-button-prev",
      },
      pagination: {
        el: ".types .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      on: {
        init: function () {
          console.log("Swiper init");
          gsap.fromTo(
            ".types .swiper-slide",
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.inOut", stagger: 0.2 }
          );
        },
      },
    });
  
    var swiperTestimonials = new Swiper(".testimonials .swiper-container", {
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: ".testimonials .swiper-pagination",
        clickable: true,
      },
      on: {
        init: function () {
          console.log("Testimonials slider initialized.");
          gsap.fromTo(
            ".testimonials .swiper-slide",
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.inOut", stagger: 0.2 }
          );
        },
        slideChange: function () {
          console.log("Testimonials slider changed.");
          const currentSlide = this.slides[this.activeIndex];
          const quote = currentSlide.querySelector(".quote");
          gsap.fromTo(
            quote,
            { scale: 0.9 },
            { scale: 1, duration: 1, ease: "elastic.out(1, 0.4)" }
          );
        },
      },
    });
  });
  