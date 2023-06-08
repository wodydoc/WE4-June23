/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__data`)
sr.reveal(`.home__img`, {delay: 500})
sr.reveal(`.home__social`, {delay: 600})
sr.reveal(`.about__img, .benefits__data, .contact__box`,{origin: 'left'})
sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
sr.reveal(`.steps__card, .product__card, .questions__group, .footer`,{interval: 100})
// Add the new animation for the SVG
sr.reveal('.home__img', {
    origin: 'bottom',
    distance: '20px',
    duration: 1000,
    delay: 400
});
// compay marquee
console.clear();

var slideDelay = 1.5;
var slideDuration = 1;
var slides = document.querySelectorAll(".slide");
var numSlides = slides.length;

TweenLite.set(slides, {
  xPercent: function (i, target) {
    return i * 100;
  },
});

var wrap = wrapPartial(-100, (numSlides - 1) * 100);
var timer = TweenLite.delayedCall(slideDelay, autoPlay).pause();
var proxy = document.createElement("div");
TweenLite.set(proxy, { x: "+=0" });
var transform = proxy._gsTransform;
var slideWidth = 0;
var wrapWidth = 0;
var animation = new TimelineMax({ repeat: -1 });
resize();

window.addEventListener("resize", resize);

function animateSlides(direction) {
  var progress = animation.progress() + direction / numSlides;
  timer.pause();
  animation.pause();
  TweenLite.to(animation, slideDuration, {
    progress: progress,
    overwrite: true,
    modifiers: {
      progress: function (value) {
        return (value < 0 || value === 1 ? 1 : 0) + (value % 1);
      },
    },
    onComplete: function () {
      timer.restart(true);
    },
  });
}

function autoPlay() {
  animation.play();
  TweenLite.fromTo(
    animation,
    1,
    { timeScale: 0 },
    { timeScale: 1, ease: Power1.easeIn }
  );
}

function updateProgress() {
  animation.progress(transform.x / wrapWidth);
}

function resize() {
  var progress = animation.progress();
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  animation
    .progress(0)
    .clear()
    .to(slides, 100, {
      xPercent: "+=" + numSlides * 100,
      ease: Linear.easeNone,
      modifiers: {
        xPercent: wrap,
      },
    })
    .to(proxy, 100, { x: wrapWidth, ease: Linear.easeNone }, 0)
    .progress(progress);
}

function wrapPartial(min, max) {
  var r = max - min;
  return function (value) {
    var v = value - min;
    return ((r + (v % r)) % r) + min;
  };
}

// home img 
// $('.home__img').mouseleave(function() {
//     $('#E-path, #W-path').css('transform', 'translate(0, 0)'); /* Reset the transform */
//   });
  

// HOME TITLE WORD SHUFFLER
const phrases = [
    "communication",
    "leadership",
    "management",
    "development",
    "success",
  ];
  
  let currentIndex = 0;
  const phraseElement = document.querySelector(".random-word");
  
  const randomizeText = () => {
    currentIndex = (currentIndex + 1) % phrases.length;
    const newPhrase = phrases[currentIndex];
    phraseElement.textContent = newPhrase;
  };
  
  randomizeText();
  setInterval(randomizeText, 4000);
  

  
// SPIN AND PARALLAX SCROLL
gsap.set("#youspinmerightroundbabyrightround", { xPercent: 0, transformOrigin: "center" });

var rotate = gsap.timeline({
    scrollTrigger: {
      trigger: "#wrap",
      pin: true,
      scrub: 0.2,
      start: "top top",
      end: "+=10000",
    }
  })
  .to("#youspinmerightroundbabyrightround", {
    rotation: 360 * 5,
    y: "-20%", // Add this to create a slight parallax effect
    duration: 1,
    ease: "none"
  });





