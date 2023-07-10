// ------------------------------
// Animate On Scroll Initialization
// ------------------------------
AOS.init();

// ------------------------------
// ScrollReveal Initialization and Configuration
// ------------------------------
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

// Using ScrollReveal to reveal elements with customized options
// sr.reveal(`.home__title, .home__title-container`);
// sr.reveal(`.home__social`, { delay: 600 });
sr.reveal(`.benefits__title, .benefits__description, .contact__box`, {
  origin: "left",
});
sr.reveal(`.contact__form`, { origin: "right" });
sr.reveal(`.processors, .stances, .types, .questions__group, .footer`, {
  interval: 100,
});

// Additional animations for SVG elements and sections
sr.reveal(
  ".meet-joey-schewee__img, .meet-joey-schewee__title, .meet-joey-schewee__details-description",
  {
    origin: "bottom",
    distance: "20px",
    duration: 1000,
    delay: 400,
  }
);
sr.reveal(".slides-inner, .testimonials, .about__title", {
  origin: "bottom",
  distance: "100px",
  duration: 1000,
  delay: 400,
});

// ------------------------------
// GSAP Animations (General Example)
// ------------------------------
// gsap.from(".element-selector", {
//   opacity: 0,
//   duration: 1,
//   y: -50,
//   stagger: 0.6,
// });

// ------------------------------
// Home Title Word Shuffler
// ------------------------------
const phrases = [
  "communication",
  "leadership",
  "management",
  "development",
  "success",
];
const phraseElement = document.querySelector(".highlight-word");
let currentIndex = 0;

const animateText = () => {
  gsap.to(phraseElement, {
    duration: 0.5,
    opacity: 0,
    onComplete: () => {
      currentIndex = (currentIndex + 1) % phrases.length;
      phraseElement.textContent = phrases[currentIndex];
      phraseElement.parentElement.setAttribute(
        "aria-label",
        `Understanding the core motivations that influence behavior can have an immediate &amp; lasting impact on the ${phrases[currentIndex]} of your business.`
      );
      gsap.fromTo(
        phraseElement,
        { scale: 0, y: 50, opacity: 0 },
        { duration: 0.5, scale: 1, y: 0, opacity: 1 }
      );
    },
  });
};

animateText();
setInterval(animateText, 4000);

// gsap.from(".home__title", {duration: 1.5, scale: 0.8, y: 50, opacity: 0, ease: "power3.out"});
// gsap.from(".button", {duration: 1.5, scale: 0.8, y: 50, opacity: 0, ease: "power3.out", delay: 0.5});
// gsap.from(".home__social-link", {duration: 1, y: 50, opacity: 0, stagger: 0.3, ease: "power3.out", delay: 0.5});

// Animate the home__title and random-word
gsap.from(".home__title, .highlight-word", {
  delay: 1, // Add delay here
  duration: 1,
  scale: 0.5,
  ease: "back.out(1.7)",
});

// Animate the button
gsap.from(".button", {
  delay: 1.5, // Add delay here
  duration: 1,
  opacity: 0,
  y: 20, // Slide from bottom
  ease: "power2.out",
});

// Animate the social links
gsap.from(".home__social-link", {
  delay: 2, // Add delay here
  duration: 1,
  opacity: 0,
  y: 20, // Slide from bottom
  stagger: 0.2, // Delay between each social link
  ease: "power2.out",
});

// ------------------------------
// Spin and Parallax Scroll Animations
// ------------------------------
function rotateAnimation(id, rotation) {
  // Set the initial state
  gsap.set(id, {
    xPercent: 0,
    transformOrigin: "center",
  });

  // Define the animation
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: "#wrap",
        pin: true,
        scrub: 2,
        start: "top top",
        end: "+=10000",
      },
    })
    .to(id, {
      rotation: rotation,
      y: "-20%",
      ease: "power1.inOut",
      duration: (index, target, targets) => {
        return gsap.utils.wrap([1, 3, 5], index);
      },
    });
}

// Execute the animation with different elements and directions
let rotateClockwise = rotateAnimation("#clockwise", 360 * 5);
// let rotateCounterClockwise = rotateAnimation("#counter-clockwise", -360 * 5);
let rotateScrub = rotateAnimation("#spin-n-scrub", 360 * 5);
