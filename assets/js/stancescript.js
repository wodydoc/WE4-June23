document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin();

  const thinkingPath = document.getElementById("Thinking");
  const feelingPath = document.getElementById("Feeling");
  const doingPath = document.getElementById("Doing");

  thinkingPath.addEventListener("mouseenter", () => {
    gsap.to(thinkingPath, { y: -20, duration: 0.3, fill: "#7f8c8d" });
    gsap.to([feelingPath, doingPath], { y: 10, duration: 0.3 });
  });

  feelingPath.addEventListener("mouseenter", () => {
    gsap.to(feelingPath, { y: -20, duration: 0.3, fill: "#f39c12" });
    gsap.to([thinkingPath, doingPath], { y: 10, duration: 0.3 });
  });

  doingPath.addEventListener("mouseenter", () => {
    gsap.to(doingPath, { y: -20, duration: 0.3, fill: "#27ae60" });
    gsap.to([thinkingPath, feelingPath], { y: 10, duration: 0.3 });
  });

  [thinkingPath, feelingPath, doingPath].forEach((path) => {
    path.addEventListener("mouseleave", () => {
      gsap.to([thinkingPath, feelingPath, doingPath], { y: 0, duration: 0.3 });
      gsap.to(thinkingPath, { fill: "#f1c40f" });
      gsap.to(feelingPath, { fill: "#e74c3c" });
      gsap.to(doingPath, { fill: "#2ecc71" });
    });
  });

  window.addEventListener("scroll", () => {
    const rotation = window.scrollY;
    gsap.to(".about__img", { rotation: rotation, transformOrigin: "center" });
  });
});
