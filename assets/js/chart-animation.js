gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Organizational Success",
    items: [
      { name: "Employee Satisfaction", percentage: 64 },
      { name: "Diversity, Equity and Inclusion", percentage: 58 },
      { name: "Employee Retention", percentage: 54 },
    ],
  },
  {
    title: "Leadership",
    items: [
      { name: "Communication", percentage: 78 },
      { name: "Empathy", percentage: 76 },
      { name: "Integrity", percentage: 65 },
    ],
  },
  {
    title: "Teams",
    items: [
      { name: "Respect and Trust", percentage: 72 },
      { name: "Collaboration", percentage: 69 },
      { name: "Managing Conflict", percentage: 67 },
    ],
  },
];

const customChartsContainer = document.querySelector("#customChartsContainer");

categories.forEach((category) => {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("chart-container");
  categoryContainer.innerHTML = `<div class="chart-title">${category.title}</div>`;

  category.items.forEach((item) => {
    const chart = document.createElement("div");
    chart.classList.add("chart");

    const canvas = document.createElement("canvas");
    canvas.width = 150; // updated width
    canvas.height = 150; // updated height

    const percentage = document.createElement("div");
    percentage.classList.add("percentage");

    const label = document.createElement("div");
    label.classList.add("label");
    label.innerText = item.name;

    chart.appendChild(canvas);
    chart.appendChild(percentage);
    chart.appendChild(label);

    categoryContainer.appendChild(chart);

    const context = canvas.getContext("2d");
    const endAngle = (item.percentage / 100) * 2 * Math.PI - 0.5 * Math.PI;
    const animationDuration = 1; // duration in seconds

    let currentPercentage = 0;

    gsap.to(percentage, {
      duration: animationDuration,
      textContent: item.percentage,
      roundProps: "textContent",
      ease: "none",
      scrollTrigger: {
        trigger: chart,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        currentPercentage = parseFloat(percentage.textContent);
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Background Circle
        context.beginPath();
        context.arc(40, 40, 35, 0, 2 * Math.PI);
        context.strokeStyle = "#dcdcdc";
        context.lineWidth = 6;
        context.stroke();
        // Progress Circle
        context.beginPath();
        context.arc(
          40,
          40,
          35,
          -(0.5 * Math.PI),
          (currentPercentage / 100) * 2 * Math.PI - 0.5 * Math.PI
        );
        context.strokeStyle = "#4caf50";
        context.lineWidth = 6;
        context.stroke();
      },
    });
  });

  customChartsContainer.appendChild(categoryContainer);
});
