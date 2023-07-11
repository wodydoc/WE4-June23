document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const slideDelay = 1.5;
  const slideDuration = 1;

  // Select all slides
  const slides = document.querySelectorAll(".slide");
  const numSlides = slides.length;

  // Set initial position of each slide
  gsap.set(slides, {
    xPercent: (i) => i * 100,
  });

  // Function to wrap value
  const wrap = wrapPartial(-100, (numSlides - 1) * 100);

  // Timer for autoplay
  const timer = gsap.delayedCall(slideDelay, autoPlay).pause();

  // Proxy element to control the animation
  const proxy = document.createElement("div");
  gsap.set(proxy, { x: "+=0" });
  const transform = proxy._gsTransform;

  // Variables to store slide and wrap widths
  let slideWidth = 0;
  let wrapWidth = 0;

  // Animation timeline
  const animation = gsap.timeline({ repeat: -1 });

  // Initial resize
  resize();

  // Event listener for window resize
  window.addEventListener("resize", resize);

  // Function to animate slides
  function animateSlides(direction) {
    const progress = animation.progress() + direction / numSlides;
    timer.pause();
    animation.pause();

    gsap.to(animation, {
      progress: progress,
      duration: slideDuration,
      overwrite: true,
      modifiers: {
        progress: (value) => {
          return (value < 0 || value === 1 ? 1 : 0) + (value % 1);
        },
      },
      onComplete: () => {
        timer.restart(true);
      },
    });
  }

  // Function to autoplay slides
  function autoPlay() {
    animation.play();
    gsap.fromTo(
      animation,
      1,
      { timeScale: 1 },
      { timeScale: 0, ease: "power1.in" }
    );
  }

 // Function to resize slides and recalculate widths
function resize() {
  const progress = animation.progress();
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  animation
    .progress(0)
    .clear()
    .to(slides, 100, {
      xPercent: "+=" + numSlides * 100,
      ease: "none",
      modifiers: {
        xPercent: wrap,
      },
    })
    .to(proxy, 100, { x: wrapWidth, ease: "none" }, 0)
    .progress(progress);
}

  // Function to wrap values
  function wrapPartial(min, max) {
    const r = max - min;
    return function (value) {
      const v = value - min;
      return ((r + (v % r)) % r) + min;
    };
  }
});
