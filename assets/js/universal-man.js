gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
  const container = document.querySelector(".about__container");
  const containerWidth = container.scrollWidth;
  const panels = Array.from(container.querySelectorAll(".panel"));
  let lastScroll = 0;
  let rotationSpeed = 1;

  // Animation for the universal man
  gsap.from(".universal-man", {
    scale: 0,
    rotation: 360,
    duration: 1,
    ease: "power1.out",
  });

  // Animation for the title
  gsap.from(".about__title", {
    duration: 1,
    y: -50,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".about__title",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "restart none none none",
    },
  });

  // Horizontal scroll animation
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

  // Panel animations
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

    // 3D flip animation on hover
    deck.addEventListener("mouseenter", (event) => {
      gsap.to(event.currentTarget.querySelector(".deck-inner"), {
        rotationY: 180,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });

    deck.addEventListener("mouseleave", (event) => {
      gsap.to(event.currentTarget.querySelector(".deck-inner"), {
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  // Universal man rotation
  ScrollTrigger.create({
    trigger: ".universal-man",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const currentScroll = self.scroll;
      const direction = currentScroll > lastScroll ? 1 : -1;
      rotationSpeed = Math.max(1, Math.min(40, rotationSpeed + direction));

      let rotation = gsap.getProperty(".universal-man", "rotation");
      gsap.set(".universal-man", {
        rotation: rotation + rotationSpeed * direction,
        ease: "none",
      });

      console.log("currentScroll:", currentScroll); // New line for debugging
      console.log("rotation:", rotation); // New line for debugging

      lastScroll = currentScroll;
    },
  });
};
