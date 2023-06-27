document.addEventListener("DOMContentLoaded", function () {
  let speed = 0.5; // Slower speed for easier reading
  const marqueeContainer = document.querySelector(".marquee-section");
  const marqueeContent = document.querySelector(".marquee-content");

  // The width of the content
  const contentWidth = marqueeContent.querySelector(".text").offsetWidth;

  // Setting up the GSAP animation
  const textLoop = gsap.to(marqueeContent, {
    x: `-${contentWidth}px`, // Move content just outside the left edge of the screen
    duration: 30 / speed, // Longer duration for slower speed
    repeat: -1, // Infinite repeat
    ease: "none", // Linear motion
    paused: true,
  });

  textLoop.play();

  // Pause animation on hover
  marqueeContainer.addEventListener("mouseenter", () => {
    textLoop.pause();
  });

  // Resume animation when the mouse leaves
  marqueeContainer.addEventListener("mouseleave", () => {
    textLoop.play();
  });

  // Control speed based on scroll
  window.addEventListener("scroll", () => {
    const progress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    speed = 0.5 + progress * 5; // Starting from 0.5 to maintain a slower speed
    textLoop.timeScale(speed);
  });
});
