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