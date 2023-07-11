// theme.js

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());

  // Delay the redraw slightly to allow CSS to update
  setTimeout(() => {
    if (typeof window.redrawCharts === "function") {
      window.redrawCharts();
    }
  }, 100); // 100 milliseconds delay
});

// Set the theme on page load
const setTheme = () => {
  const body = document.body;
  const userTheme = localStorage.getItem("selected-theme");

  if (userTheme === "dark") {
    body.classList.add(darkTheme);
  } else {
    body.classList.remove(darkTheme);
  }
};

// Call setTheme on page load
setTheme();
