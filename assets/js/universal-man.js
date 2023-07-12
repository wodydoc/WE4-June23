gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom top",
    scrub: true,
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.pause()
  },
});

// Initial Animation - FadeIn
gsap.from("#universal_man", {opacity: 0, duration: 1.5, ease: "power2.out"});

// Rotate and Scale animation - we'll give it a playful twist by alternating the direction of rotation.
tl.to("#universal_man", { 
  rotation: 360, 
  scale: 1.5, 
  duration: 2, 
  ease: "power1.inOut", 
  repeat: -1,
  yoyo: true
})
.to("#universal_man", { 
  rotation: -360, 
  duration: 2, 
  ease: "power1.inOut", 
  repeat: -1,
  yoyo: true
});

// Pulsate animation to create a breathing effect
tl.to("#universal_man", {
  scale: 1.6,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power2.inOut"
});

// Create an illusion of universal man drawing itself
tl.from("#universal_man path", {
  drawSVG: "0%", 
  duration: 1,
  stagger: 0.3,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
});
