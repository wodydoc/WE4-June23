gsap.registerPlugin(ScrollTrigger);

const data = [
  { title: "Career Development", percentage: 40 },
  { title: "Leadership & Team Development", percentage: 70 },
  { title: "Communication Skills", percentage: 60 },
  { title: "Change Management", percentage: 50 },
  { title: "Conflict Resolution", percentage: 30 },
];

const chartContainer = document.querySelector("#customChart");

data.forEach((item, index) => {
  const chart = document.createElement("div");
  chart.classList.add("chart");
  chart.innerHTML = `
    <svg class="circle-chart" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-bg" cx="18" cy="18" r="15.9" fill="none" stroke="var(--container-color)" stroke-width="4"></circle>
      <circle class="circle-fg" cx="18" cy="18" r="15.9" fill="none" stroke="var(--first-color)" stroke-width="4" stroke-dasharray="${item.percentage},100" stroke-dashoffset="25"></circle>
      <text x="18" y="20.35" class="percentage" font-size="10" text-anchor="middle" fill="var(--first-color)">${item.percentage}%</text>
    </svg>
    <div class="y-axis-label">${item.title}</div>
  `;
  chartContainer.appendChild(chart);

  // GSAP Animation
  gsap.from(chart, {
    scrollTrigger: {
      trigger: chart,
      toggleActions: "restart none none reset",
    },
    duration: 1,
    opacity: 0,
    y: 100,
    stagger: 0.1,
  });
});

// Stat Container
const statContainer = document.createElement("div");
statContainer.classList.add("stat-container");
statContainer.innerHTML = `
  <span class="stat-percentage">70<span class="percentage-sign">%</span></span>
  <p class="stat-description">of companies prefer in-person Enneagram training</p>
`;

// Append the statContainer to the section container instead of chartContainer
document.querySelector("#prominentStatContainer").appendChild(statContainer);

// GSAP Animation for Stat Container
gsap.from(statContainer, {
  scrollTrigger: {
    trigger: statContainer,
    toggleActions: "restart none none reset",
  },
  duration: 1.5,
  opacity: 0,
  y: 100,
  delay: 1,
});
