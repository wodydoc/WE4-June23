document.addEventListener("DOMContentLoaded", function () {
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

  const customChartsContainer = document.querySelector(
    ".custom-charts-container"
  );

  categories.forEach((category) => {
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");

    const chartTitle = document.createElement("div");
    chartTitle.classList.add("chart-title");
    chartTitle.innerText = category.title;

    chartContainer.appendChild(chartTitle);

    category.items.forEach((item) => {
      const chart = document.createElement("div");
      chart.classList.add("chart");

      const canvasContainer = document.createElement("div");
      canvasContainer.classList.add("canvas-container");

      const canvas = document.createElement("canvas");
      canvas.setAttribute("data-percent", item.percentage);
      canvas.width = 300;
      canvas.height = 300;

      const percentageContainer = document.createElement("div");
      percentageContainer.classList.add("percentage-container");

      const percentageText = document.createElement("div");
      percentageText.innerText = `${item.percentage}%`;
      percentageContainer.appendChild(percentageText);

      const improvementLabel = document.createElement("div");
      improvementLabel.classList.add("improvement-label");
      improvementLabel.innerText = "IMPROVEMENT";

      const curvedText = document.createElement("div");
      curvedText.classList.add("curved-text");
      curvedText.innerText = item.name;

      canvasContainer.appendChild(canvas);
      chart.appendChild(canvasContainer);
      chart.appendChild(percentageContainer);
      chart.appendChild(improvementLabel);
      chart.appendChild(curvedText);
      chartContainer.appendChild(chart);
    });

    customChartsContainer.appendChild(chartContainer);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const canvas = entry.target.querySelector("canvas");
          const ctx = canvas.getContext("2d");
          const percent = canvas.getAttribute("data-percent");
          const percentageContainer = entry.target.querySelector(
            ".percentage-container"
          );
          const percentageText = percentageContainer.querySelector("div");
          let progress = 0;

          const animation = setInterval(() => {
            if (progress >= percent) {
              clearInterval(animation);
            } else {
              progress++;
              drawChart(ctx, progress, canvas);
              percentageText.innerText = `${progress}%`;
            }
          }, 20);
        }
      });
    },
    { threshold: 0 }
  );

  const charts = document.querySelectorAll(".chart");
  charts.forEach((chart) => {
    observer.observe(chart);
  });
});

function drawChart(ctx, progress, canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const endAngle = (progress / 100) * 2 * Math.PI;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background Circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#e6e6e6";
  ctx.stroke();

  // Progress Circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#4caf50";
  ctx.shadowColor = "#4caf50";
  ctx.shadowBlur = 10;
  ctx.stroke();
}
