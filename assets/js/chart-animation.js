gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Success",
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

// Function to create charts
const createCharts = () => {
  customChartsContainer.innerHTML = "";

  // Loop through each category and create charts
  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("chart-container");
    categoryContainer.innerHTML = `<div class="chart-title">${category.title}</div>`;

    category.items.forEach((item) => {
      const chart = document.createElement("div");
      chart.classList.add("chart");

      const canvas = document.createElement("canvas");
      canvas.width = 120;
      canvas.height = 120;

      const percentageContainer = document.createElement("div");
      percentageContainer.classList.add("percentage-container");

      const percentage = document.createElement("span");
      percentage.classList.add("percentage");

      const percentSign = document.createElement("span");
      percentSign.classList.add("percent-sign");
      percentSign.textContent = "%";

      percentageContainer.appendChild(percentage);
      percentageContainer.appendChild(percentSign);

      chart.appendChild(canvas);
      chart.appendChild(percentageContainer);

      const improvementLabel = document.createElement("div");
      improvementLabel.classList.add("improvement-label");
      improvementLabel.textContent = "Improvement in";
      chart.appendChild(improvementLabel);

      const areaLabel = document.createElement("div");
      areaLabel.classList.add("label");
      areaLabel.textContent = item.name;
      chart.appendChild(areaLabel);

      categoryContainer.appendChild(chart);

      // Animation
      const context = canvas.getContext("2d");
      let currentPercentage = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chart,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
          onEnter: () => tl.play(0),
          onLeaveBack: () => tl.play(0),
        },
      });

      tl.to(percentage, {
        duration: 1.5,
        textContent: item.percentage,
        roundProps: "textContent",
        ease: "elastic.out(1, 0.3)",
      });

      tl.add(
        gsap.to(
          {},
          {
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            onUpdate: () => {
              currentPercentage = parseFloat(percentage.textContent);
              context.clearRect(0, 0, canvas.width, canvas.height);

              // Gradient for background circle
              const gradient = context.createLinearGradient(
                0,
                0,
                canvas.width,
                canvas.height
              );
              gradient.addColorStop(0, "darkgrey");
              gradient.addColorStop(1, "deepskyblue");

              // Background Circle
              context.beginPath();
              context.arc(60, 60, 50, 0, 2 * Math.PI);
              context.strokeStyle = gradient;
              context.lineWidth = 8;
              context.stroke();

              // Progress Circle
              context.beginPath();
              context.arc(
                60,
                60,
                50,
                -(0.5 * Math.PI),
                (currentPercentage / 100) * 2 * Math.PI - 0.5 * Math.PI
              );
              context.strokeStyle = "#4caf50"; // green color for progress
              context.lineWidth = 8;
              context.stroke();
            },
          }
        ),
        0
      );
    });

    customChartsContainer.appendChild(categoryContainer);
  });
};

createCharts();

// Redraw charts on theme change
document.getElementById("theme-button").addEventListener("click", createCharts);
