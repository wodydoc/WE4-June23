// Constants for reusable selectors

const SELECTORS = {
  UNIVERSAL_MAN: "#universal-man",
  ABOUT_TITLE: "#about__title",
  CONTAINER: "#about__container",
  PANEL: ".panel",
  DECK: ".deck",
  DECK_INNER: ".deck-inner",
};

// Store last scroll position for rotation direction
let lastScroll = 0;

window.onload = function () {
  initScrollAnimations();
};

// GSAP Animations on Scroll
function initScrollAnimations() {
  animateUniversalMan();
  animateAboutTitle();
  const container = document.querySelector(SELECTORS.CONTAINER);
  const panels = Array.from(container.querySelectorAll(SELECTORS.PANEL));

  panels.forEach((panel) => {
    animateDeckOnHover(panel);
  });

  animateContainer(container);
}

function animateUniversalMan() {
  const universalManTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: SELECTORS.UNIVERSAL_MAN,
      start: "top 80%",
      end: "bottom 10%",
      scrub: 1,
      // pin: true,
      ease: "power1.out",
    },
  });

  universalManTimeline
    .from(SELECTORS.UNIVERSAL_MAN, {
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: "power1.out",
    })
    .to(SELECTORS.UNIVERSAL_MAN, {
      rotation: 720,
      duration: 1,
      ease: "power1.out",
    })
    .to(SELECTORS.UNIVERSAL_MAN, {
      rotation: 1080,
      duration: 1,
      ease: "power1.out",
    });
}

function animateAboutTitle() {
  gsap.from(SELECTORS.ABOUT_TITLE, {
    duration: 1,
    y: -50,
    ease: "power1.out",
    scrollTrigger: {
      trigger: SELECTORS.ABOUT_TITLE,
      start: "top 10%",
      end: "bottom 80%",
      toggleActions: "restart none none none",
    },
  });
}
