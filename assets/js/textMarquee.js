document.addEventListener("DOMContentLoaded", function () {
  let speed = 0.7; // Slightly faster for better legibility
  const marqueeSection = document.querySelector(".marquee-section");
  const marqueeContent = document.querySelector(".marquee-content");

  // The width of the content
  const contentWidth = marqueeContent.querySelector(".text").offsetWidth;

  // Setting up the GSAP animation
  const textLoop = gsap.to(marqueeContent, {
    x: `-${contentWidth}px`, // Move content just outside the left edge of the screen
    duration: 20 / speed, // Longer duration for slower speed
    repeat: -1, // Infinite repeat
    ease: "none", // Linear motion
    paused: true,
  });

  textLoop.play();

  // Pause animation on hover and switch the background color and text color
  marqueeSection.addEventListener("mouseenter", () => {
    textLoop.pause();
    gsap.to(marqueeSection, {
      backgroundColor: "var(--body-color)",
      color: "var(--title-color)",
      duration: 0.5,
    });
  });

  // Resume animation when the mouse leaves and revert the background and text color
  marqueeSection.addEventListener("mouseleave", () => {
    textLoop.play();
    gsap.to(marqueeSection, {
      backgroundColor: "var(--title-color)",
      color: "var(--body-color)",
      duration: 0.5,
    });
  });

  // Control speed based on scroll
  window.addEventListener("scroll", () => {
    const progress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    speed = 0.7 + progress * 4.3; // Starting from 0.7 for better legibility
    textLoop.timeScale(speed);
  });
});
