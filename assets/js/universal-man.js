// Constants for reusable selectors
const SELECTORS = {
  CONTAINER: ".about__container",
  PANEL: ".panel",
  UNIVERSAL_MAN: "#universal-man",
  ABOUT_TITLE: ".about__title",
  DECK: ".deck",
  DECK_INNER: ".deck-inner",
  SVG: "svg",
  H1: "h1",
};

// Store last scroll position for rotation direction
let lastScroll = 0;

window.onload = function () {
  initScrollAnimations();
  initHoverAnimations();
};

// GSAP Animations on Scroll
function initScrollAnimations() {
  const container = document.querySelector(SELECTORS.CONTAINER);
  const panels = Array.from(container.querySelectorAll(SELECTORS.PANEL));

  animateUniversalMan();
  animateAboutTitle();
  animateContainer(container);
  panels.forEach((panel) => animatePanel(panel));
}

// GSAP Hover Animations
function initHoverAnimations() {
  const panels = Array.from(document.querySelectorAll(SELECTORS.PANEL));
  panels.forEach((panel) => animateDeckOnHover(panel));
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

function animateContainer(container) {
  const containerWidth = container.scrollWidth;

  gsap.to(container, {
    x: -containerWidth + window.innerWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: true,
      start: "top top",
      end: () => `+=${containerWidth}`,
      invalidateOnRefresh: true,
    },
  });
}

function animatePanel(panel) {
  const deck = panel.querySelector(SELECTORS.DECK);
  const svg = deck.querySelector(SELECTORS.SVG);
  const title = deck.querySelector(SELECTORS.H1);

  gsap.from([svg, title], {
    opacity: 0,
    scrollTrigger: {
      trigger: panel,
      start: "center center",
      end: "center center",
      scrub: true,
      toggleActions: "play none none reverse",
    },
  });
}

function animateDeckOnHover(panel) {
  const deck = panel.querySelector(SELECTORS.DECK);

  deck.addEventListener("mouseenter", (event) => {
    gsap.to(event.currentTarget.querySelector(SELECTORS.DECK_INNER), {
      rotationY: 180,
      duration: 1,
      ease: "power1.out",
    });
  });

  deck.addEventListener("mouseleave", (event) => {
    gsap.to(event.currentTarget.querySelector(SELECTORS.DECK_INNER), {
      rotationY: 0,
      duration: 1,
      ease: "power1.out",
    });
  });
}
