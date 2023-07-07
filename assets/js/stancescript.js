window.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin();

  const decks = document.querySelectorAll(".playful-deck");

  decks.forEach((deck) => {
    deck.addEventListener("mouseenter", () => {
      gsap.to(deck, { rotationY: 180, duration: 0.5, ease: "power2.inOut" });
    });

    deck.addEventListener("mouseleave", () => {
      gsap.to(deck, { rotationY: 0, duration: 0.5, ease: "power2.inOut" });
    });
  });
});
