function drawGrid(dimensions, node) {
    const parentNode = document.querySelector(node);
    // Clear the canvas if it's already set-up.
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
    var cellSize = 540 / dimensions;
    parentNode.style.setProperty("--grid-size", dimensions);
    parentNode.style.setProperty("--cell-size", `${cellSize}px`);
    for (var i = 0; i < dimensions; ++i) {
        const row = document.createElement("div");
        row.classList.add("row");
        parentNode.appendChild(row);
        for (var j = 0; j < dimensions; ++j) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.opacity = .2;
            row.appendChild(cell);
        }
    }
}

function drawCell(e) {
    e.target.classList.add("filled");
    var newOpacity = Number(e.target.style.opacity);
    newOpacity *= 1.25;
    e.target.style.opacity = newOpacity;
}

function setUp(gridSize = 16) {
    drawGrid(gridSize, "#canvas");
    const cellList = document.querySelectorAll(".cell");
    cellList.forEach((cell) => { cell.addEventListener("mouseover", drawCell); });
}

function resetGrid() {
    var gridSize;
    do {
        gridSize = prompt("Which grid size would you like? (1-100)");
    } while (isNaN(gridSize) || gridSize > 100);
    setUp(gridSize);
}

window.onload = function main() {
    setUp();
    const resetButton = document.querySelector("input#reset");
    resetButton.addEventListener("click", resetGrid);
}