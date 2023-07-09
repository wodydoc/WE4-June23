gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
});

// Rotate animation
tl.to("#universal_man", { rotation: 360, ease: "none" });

// Scale animation
tl.to("#universal_man", { scale: 1.5, duration: 2, yoyo: true, repeat: -1 });

// Waving arms animation
gsap.to("#a .b", {
  rotation: 20,
  transformOrigin: "50% 50%",
  yoyo: true,
  repeat: -1,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
});
