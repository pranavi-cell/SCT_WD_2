const display = document.querySelector(".time");

const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap-btn");

const lapsList = document.querySelector(".laps ul");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

// Format time
function formatTime(milliseconds) {

    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0")
    );
}

// Update display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start stopwatch
startBtn.addEventListener("click", () => {

    if (!running) {

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {

            elapsedTime = Date.now() - startTime;

            updateDisplay();

        }, 100);

        running = true;
    }
});

// Pause stopwatch
pauseBtn.addEventListener("click", () => {

    if (running) {

        clearInterval(timerInterval);

        running = false;
    }
});

// Reset stopwatch
resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    running = false;

    elapsedTime = 0;

    lapCount = 0;

    display.textContent = "00:00:00";

    lapsList.innerHTML = "";
});

// Record Lap
lapBtn.addEventListener("click", () => {

    if (elapsedTime === 0) return;

    lapCount++;

    const lapItem = document.createElement("li");

    lapItem.textContent =
        `Lap ${lapCount} - ${formatTime(elapsedTime)}`;

    lapsList.prepend(lapItem);
});