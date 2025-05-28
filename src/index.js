import { MAX_SIZE_WHEEL_LABEL, SVG_URL, CIRCLE_RADIUS } from "./constants.js";

import { calculateTextSize } from "./text-helpers.js";

const inputText = document.getElementById("input-text");
const wheel = document.querySelector(".wheel");
const winnerContainer = document.querySelector(".section-left");
const randomWinner = document.querySelector(".random-winner");
const initWheelText = document.querySelector(".init-wheel-text");
const buttonSpin = document.querySelector(".button-spin");

let accumulatedAngle = 0;
let labels = [];

const initWheel = () => {
  winnerContainer.style.display = "none";
  initWheelText.style.display = "block";
};

const renderLabels = (labels) => {
  wheel.innerHTML = "";
  initWheelText.style.display = "none";
  winnerContainer.style.display = "flex";

  const angleStep = (2 * Math.PI) / labels.length;

  labels.forEach((label, index) => {
    const startAngle = Math.PI + Math.PI / 2 + index * angleStep;
    const endAngle = startAngle + angleStep;

    const startArcX = CIRCLE_RADIUS * Math.cos(startAngle);
    const startArcY = CIRCLE_RADIUS * Math.sin(startAngle);
    const endArcX = CIRCLE_RADIUS * Math.cos(endAngle);
    const endArcY = CIRCLE_RADIUS * Math.sin(endAngle);

    const largeArcFlag = angleStep > Math.PI ? 1 : 0;

    const path = document.createElementNS(SVG_URL, "path");

    const pathData = `M 0 0 L ${startArcX} ${startArcY} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 ${largeArcFlag} 1 ${endArcX} ${endArcY} Z`;
    path.setAttribute("d", pathData);
    path.setAttribute(
      "fill",
      `hsl(${(index * 360) / labels.length}, 50%, 60%)`
    );
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", ".2");

    wheel.appendChild(path);

    const midAngle = startAngle + angleStep / 2;

    const textX = 0.6 * CIRCLE_RADIUS * Math.cos(midAngle);
    const textY = 0.6 * CIRCLE_RADIUS * Math.sin(midAngle);

    const midDeg = (midAngle * 180) / Math.PI;

    manageText(textX, textY, midDeg, label);
  });
};

const manageText = (textX, textY, midDeg, label) => {
  const text = document.createElementNS(SVG_URL, "text");
  const maxLabelLength = labels.reduce(
    (max, label) => Math.max(max, label.length),
    0
  );

  text.setAttribute("x", textX);
  text.setAttribute("y", textY);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("transform", `rotate(${midDeg}, ${textX}, ${textY})`);
  text.textContent = label;

  if (label.length > MAX_SIZE_WHEEL_LABEL) {
    text.textContent = `${label.slice(0, MAX_SIZE_WHEEL_LABEL)} ...`;
  }

  text.style.fontSize = calculateTextSize(maxLabelLength);
  wheel.appendChild(text);
};

const calculateIndexRandomWinner = (labels) => {
  return Math.floor(Math.random() * labels.length);
};

const renderRandomWinner = (labels) => {
  const winnerIndex = calculateIndexRandomWinner(labels);

  randomWinner.textContent = "Wheel of Fortune";

  rotateWheel(winnerIndex);

  setTimeout(() => {
    if (labels.length !== 0) {
      randomWinner.textContent = `Winner: ${labels[winnerIndex]}`;
    }
  }, 8000);
};

const rotateWheel = (winnerIndex) => {
  const angleStep = 360 / labels.length;
  const currentMod = accumulatedAngle % 360;
  const target =
    (360 - angleStep * winnerIndex - Math.random() * angleStep + 360) % 360;
  const delta = (target - currentMod + 360) % 360;
  const spinAngle = delta + 720;

  accumulatedAngle += spinAngle;

  wheel.style.transition = "transform 7s ease-in-out";
  wheel.style.transform = `translate(${CIRCLE_RADIUS}px, ${CIRCLE_RADIUS}px) rotate(${accumulatedAngle}deg)`;
};

const handleInputChange = (event) => {
  labels = event.target.value.split("\n").filter((element) => element !== "");

  if (event.target.value === "") {
    initWheel();
  } else {
    renderLabels(labels);
  }
};

inputText.addEventListener("input", handleInputChange);
buttonSpin.addEventListener("click", () => renderRandomWinner(labels));
wheel.addEventListener("click", () => renderRandomWinner(labels));
