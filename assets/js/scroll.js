/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 80) {
    header.classList.add("scroll-header");
    header.style.backgroundColor = "var(--container-color)"; 
  } else {
    header.classList.remove("scroll-header");
    header.style.backgroundColor = "var(--body-color)"; 
  }
}
window.addEventListener("scroll", scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50, // Increased offset to match the header height
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      const activeLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );
      if (activeLink) activeLink.classList.remove("active-link"); // Added null check
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) {
    scrollUp.classList.add("show-scroll");
    scrollUp.classList.add("scroll-header");
  } else {
    scrollUp.classList.remove("show-scroll");
    scrollUp.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollUp);
