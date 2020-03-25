// Global variables
var onPause = false;
var stopped = true;
var workTime = 15;
var breakTime = 5;
var cycles = 4;
var intervalTimer;

// Timer Class
class Timer {
    #totalTime;
    #elapsed;
    #minutes;
    #seconds;

    constructor(time) {
        this.#totalTime = time;
        if (this.#totalTime > 59) {
            this.#minutes = time / 60;
        } else {
            this.#minutes = 0;
        }
        this.#seconds = time - (this.#minutes * 60);
        this.#elapsed = 0;
    }

    getTimeString() {
        let min = this.#minutes.toString().padStart(2, "0");
        let sec = this.#seconds.toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    getTotalTime() {
        return this.#totalTime;
    }

    getSecondsRemaining() {
        return this.#totalTime - this.#elapsed;
    }

    decrease() {
        if (this.#seconds === 0) {
            this.#minutes--;
            this.#seconds = 59;
        } else {
            this.#seconds--;
        }
        this.#elapsed++;
    }

    reset() {
        if (this.#totalTime > 59) {
            this.#minutes = this.#totalTime / 60;
        } else {
            this.#minutes = 0;
        }
        this.#seconds = this.#totalTime - (this.#minutes * 60);
        this.#elapsed = 0;
    }

    updateTime(newTime) {
        this.#totalTime = newTime;
        if (this.#totalTime > 59) {
            this.#minutes = newTime / 60;
        } else {
            this.#minutes = 0;
        }
        this.#seconds = newTime - (this.#minutes * 60);
        this.#elapsed = 0;
    }
}

function timeHandler(workTimer, breakTimer, cycles, timerSpace) {
    let onBreak = false;
    let breakTime = breakTimer.getTotalTime();
    let currentCycle = 0;

    return function () {
        if (!onPause) {
            if (!onBreak) {
                workTimer.decrease();
                timerSpace.textContent = workTimer.getTimeString();
                if (workTimer.getSecondsRemaining() === 0) {
                    workTimer.reset();
                    currentCycle++;
                    onBreak = true;
                    console.log("Change to break timer");
                }
            } else {
                breakTimer.decrease();
                timerSpace.textContent = breakTimer.getTimeString();
                if (breakTimer.getSecondsRemaining() === 0) {
                    breakTimer.updateTime(breakTime);
                    breakTimer.reset();
                    onBreak = false;
                    console.log("Change to work timer");
                    console.log("Current cycle:", currentCycle, "of", cycles);
                }
            }
            if (currentCycle === cycles) {
                breakTimer.updateTime(900);
                currentCycle = 0;
            }
        }
    }
}

// Global functions
function swapStartPause() {
    startButton.classList.toggle("hidden");
    pauseButton.classList.toggle("hidden");
}

// Event handler functions
function startTimer(workTime, breakTime, cycles) {
    if (onPause) {
        swapStartPause();
        onPause = false;
    } else {
        stopped = false;
        swapStartPause();
        let workTimer = new Timer(workTime);
        let breakTimer = new Timer(breakTime);
        const timerSpace = this.document.querySelector("#timer");
        intervalTimer = setInterval(timeHandler(workTimer, breakTimer, cycles, timerSpace), 1000);
    }
}

function pauseTimer() {
    swapStartPause();
    onPause = true;
}

function stopTimer() {
    stopped = true;
    clearInterval(intervalTimer);
    const timerDisplay = this.document.querySelector("#timer");
    timerDisplay.textContent = `${workTime.toString().padStart(2, "0")}:00`;
    startButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
}

function incWorkTime(e) {
    if (stopped && workTime < 99) {
        workTime = ++this.document.querySelector("#currWorkTime").textContent;
        const timerDisplay = this.document.querySelector("#timer");
        timerDisplay.textContent = `${workTime.toString().padStart(2, "0")}:00`;
    }
}

function decWorkTime(e) {
    if (stopped && workTime > 1) {
        workTime = --this.document.querySelector("#currWorkTime").textContent;
        const timerDisplay = this.document.querySelector("#timer");
        timerDisplay.textContent = `${workTime.toString().padStart(2, "0")}:00`;
    }
}

function incBreakTime(e) {
    if (stopped && breakTime < 99) {
        breakTime = ++this.document.querySelector("#currBreakTime").textContent;
    }
}

function decBreakTime(e) {
    if (stopped && breakTime > 1) {
        breakTime = --this.document.querySelector("#currBreakTime").textContent;
    }
}

function incCycles(e) {
    if (stopped && cycles < 99) {
        cycles = ++this.document.querySelector("#currCycles").textContent;
    }
}

function decCycles(e) {
    if (stopped && cycles > 1) {
        cycles = --this.document.querySelector("#currCycles").textContent;
    }
}

// Main function
window.onload = function main() {
    // Clickable buttons
    const startButton = this.document.querySelector("#startButton");
    const pauseButton = this.document.querySelector("#pauseButton");
    const stopButton = this.document.querySelector("#stopButton");
    const incWorkTimeButton = this.document.querySelector("#incWorkTime");
    const decWorkTimeButton = this.document.querySelector("#decWorkTime");
    const incBreakTimeButton = this.document.querySelector("#incBreakTime");
    const decBreakTimeButton = this.document.querySelector("#decBreakTime");
    const incCyclesButton = this.document.querySelector("#incCycles");
    const decCyclesButton = this.document.querySelector("#decCycles");

    // Event listeners
    startButton.addEventListener("click", () => startTimer(workTime * 60, breakTime * 60, cycles));
    pauseButton.addEventListener("click", () => pauseTimer());
    stopButton.addEventListener("click", () => stopTimer());
    incWorkTimeButton.addEventListener("click", (e) => incWorkTime(e));
    decWorkTimeButton.addEventListener("click", (e) => decWorkTime(e));
    incBreakTimeButton.addEventListener("click", (e) => incBreakTime(e));
    decBreakTimeButton.addEventListener("click", (e) => decBreakTime(e));
    incCyclesButton.addEventListener("click", (e) => incCycles(e));
    decCyclesButton.addEventListener("click", (e) => decCycles(e));
}
