window.onload = function () {
  gsap.registerPlugin(ScrollTrigger);

  let container = document.querySelector(".about__container"); // Use the container within the About section

  // get the width of the container
  let containerWidth = container.scrollWidth;

  gsap.to(container, {
    x: -containerWidth + window.innerWidth,
    scrollTrigger: {
      trigger: ".about__container", // set the trigger to be the About section
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => `+=${containerWidth}`,
      invalidateOnRefresh: true,
    },
    ease: "none", // no easing
  });

  const panels = Array.from(containerAnimation.querySelectorAll(".panel"));
  panels.forEach((panel) => {
    const deck = panel.querySelector(".deck");
    const svg = deck.querySelector("svg");
    const title = deck.querySelector("h1");

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

    deck.addEventListener("mouseenter", () => {
      gsap.to(deck.querySelector(".deck-inner"), {
        rotationY: 180,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });

    deck.addEventListener("mouseleave", () => {
      gsap.to(deck.querySelector(".deck-inner"), {
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  let lastScroll = 0;
  let rotationSpeed = 20;

  ScrollTrigger.create({
    trigger: ".universal-man",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      let currentScroll = self.scroll;
      let direction = currentScroll > lastScroll ? 1 : -1;

      rotationSpeed += direction * 0.5;

      gsap.to(".universal-man", {
        rotation: "+=" + 360 * direction,
        duration: rotationSpeed,
        repeat: -1,
        ease: "none",
      });

      lastScroll = currentScroll;
    },
  });

  gsap.from(".about__title", {
    duration: 1,
    autoAlpha: 0,
    y: -50,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".about__title",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "restart none none none",
    },
  });

  let horizontalScroll = new gsap.timeline({
    scrollTrigger: {
      trigger: ".about__container",
      pin: true,
      scrub: 1,
      start: "top top",
      end: () =>
        "+=" +
        (document.querySelector(".about__container").offsetWidth -
          window.innerWidth),
    },
  });

  horizontalScroll.to(".playful-deck-container", {
    x: -document.querySelector(".playful-deck-container").offsetWidth,
    ease: "none",
  });
};
