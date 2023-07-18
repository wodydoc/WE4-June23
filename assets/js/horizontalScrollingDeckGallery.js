gsap.registerPlugin(ScrollTrigger);




function animateContainer(container) {
  const containerWidth = container.scrollWidth;

  gsap.to(container, {
    scrollTrigger: {
      trigger: SELECTORS.CONTAINER,
      pin: true,
      start: "top top",
      end: () => `+=${containerWidth}px`,
      scrub: 1,
      invalidateOnRefresh: true,
    },
    x: "-=" + (containerWidth - window.innerWidth),
    ease: "none",
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
