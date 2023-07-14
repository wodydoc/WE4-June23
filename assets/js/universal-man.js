let lastScroll = 0;
let rotationSpeed = 20; // Speed of rotation

ScrollTrigger.create({
  trigger: ".universal-man",
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    let currentScroll = self.scroll;
    let direction = (currentScroll > lastScroll) ? 1 : -1; // 1 means down, -1 means up.

    rotationSpeed += direction * 0.5; // Increase or decrease speed based on direction

    gsap.to(".universal-man", {
      rotation: "+=" + (360 * direction), // This will add or subtract 360 to the rotation based on the scroll direction.
      duration: rotationSpeed,
      repeat: -1,
      ease: "none"
    });

    lastScroll = currentScroll;
  }
});

gsap.from(".about__title", {
  duration: 1,
  autoAlpha: 0,
  y: -50,
  ease: 'power1.out',
  scrollTrigger: {
    trigger: ".about__title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "restart none none none"
  }
});

// Horizontal scroll for the .about__container
let horizontalScroll = new gsap.timeline({
  scrollTrigger: {
    trigger: ".about__container",
    pin: true,
    scrub: 1,
    start: 'top top',
    end: () => "+=" + (document.querySelector(".about__container").offsetWidth - window.innerWidth)
  }
});


horizontalScroll.to(".playful-deck-container", {
  x: -document.querySelector(".playful-deck-container").offsetWidth,
  ease: 'none'
});
