document.addEventListener("DOMContentLoaded", function () {
  const data = [
    ["Personal Growth", 81],
    ["Emotional Intelligence & Leadership", 68],
    ["Coaching & Communication", 65],
    ["Teams & Conflict", 60],
    ["Career Development", 54],
  ];

  const svg = document.getElementById("chartSVG");
  const container = document.getElementById("customChart");

  // Create tooltip
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  container.appendChild(tooltip);

  // Create bars
  const barHeight = 15;
  const gap = 20;
  const chartHeight = 100;
  const maxBarWidth = 80; // Maximum width in viewBox units
  const axisGap = 15;

  for (let i = 0; i < data.length; i++) {
    const width = (data[i][1] / 100) * maxBarWidth;
    const y = (chartHeight / data.length) * i + gap;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", axisGap);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("class", "chart-bar");
    rect.setAttribute("id", `chart-bar-${i}`);
    rect.addEventListener("mouseenter", (event) => {
      gsap.to(tooltip, { opacity: 1 });
      tooltip.innerHTML = `${data[i][0]}: ${data[i][1]}%`;
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 10}px`;
    });
    rect.addEventListener("mouseleave", () => gsap.to(tooltip, { opacity: 0 }));
    svg.appendChild(rect);

    // Y axis labels
    const yAxisLabel = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    yAxisLabel.setAttribute("x", axisGap);
    yAxisLabel.setAttribute("y", y + barHeight / 2 + 2);
    yAxisLabel.setAttribute("class", "axis-label y-axis-label");
    yAxisLabel.setAttribute("textLength", "80");
    yAxisLabel.setAttribute("lengthAdjust", "spacingAndGlyphs");
    yAxisLabel.textContent = data[i][0];
    svg.appendChild(yAxisLabel);
  }

  // Animate bars with GSAP
  gsap.utils.toArray(".chart-bar").forEach((bar, index) => {
    const animation = gsap.from(bar, {
      scrollTrigger: {
        trigger: "#customChart",
        start: "top bottom",
      },
      scaleX: 0,
      transformOrigin: "left",
      ease: "bounce",
      duration: 1.5,
      delay: index * 0.2,
    });
  });
});
