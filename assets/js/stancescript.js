window.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin();

  const decks = document.querySelectorAll(".playful-deck");

  decks.forEach((deck) => {
    deck.addEventListener("mouseenter", () => {
      console.log("entered");
      gsap.to(deck.querySelector(".deck-inner"), {
        rotationY: 180,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });

    deck.addEventListener("mouseleave", () => {
      console.log("left");
      gsap.to(deck.querySelector(".deck-inner"), {
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
});
