;; "use strict";

class Gameboard {
    constructor(domElem) {
        this.domElem = domElem;
        this.board = new Array(9);
    }

    drawToScreen() {
        for (let i = 0; i !== this.board.length; i++) {
            const nextCell = document.createElement("div");
            nextCell.setAttribute("id", `cell${Math.floor(i / 3)}-${i % 3}`);
            nextCell.classList.add("cell");
            nextCell.textContent = i;
            this.domElem.appendChild(nextCell);
        }
    }
}

class Player {
    constructor(name, marker, id, aiPlayer) {
        this.name = aiPlayer ? "Computer" : name;
        this.marker = marker;
        this.id = id;
    }
}

class Game {
    #boardDiv = document.querySelector("#gameboard");
    #moves = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    #nextPlayer;
    #aiGame;

    constructor(p1name, p2name, aiGame = false) {
        this.player1 = new Player(p1name, "X", 1);
        this.player2 = new Player(p2name, "O", -1);
        this.board = new Gameboard(this.#boardDiv);
        this.#aiGame = aiGame;
        this.#nextPlayer = this.player1;
    }

    destructor() {
        delete this.player1;
        delete this.player2;
        delete this.board;
    }

    run() {
        this.board.drawToScreen();
        this.attachEventHandlers();
    }

    attachEventHandlers() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.addEventListener("click", e => this.turnHandler(e)));
    }

    turnHandler(event) {
        let mark = event.target.textContent;
        if (mark !== this.player1.marker && mark !== this.player2.marker) {
            event.target.textContent = this.#nextPlayer.marker;
            event.target.classList.add((this.#nextPlayer === this.player1) ? "taken1" : "taken2");
            const [x, y] = event.target.getAttribute("id").slice(-3).split("-");
            this.nextMove(x, y);
        }
    }

    aiTurn() {
        console.log("AI turn");
        let possibleMoves = new Array();
        for (let x = 0; x !== this.#moves.length; x++) {
            for (let y = 0; y !== this.#moves[x].length; y++) {
                if (this.#moves[x][y] === 0) {
                    possibleMoves.push([x, y]);
                }
            }
        }
        console.log(...possibleMoves);
        const dummyMoveTable = [...this.#moves];
        const moveScores = possibleMoves.map(([x, y]) => {
            dummyMoveTable[x][y] = -1;
            const ret = this.miniMax(dummyMoveTable, false);
            dummyMoveTable[x][y] = 0;
            return ret;
        });
        const [x, y] = possibleMoves[moveScores.indexOf(Math.min(...moveScores))];
        console.log(moveScores);
        const cell = document.querySelector(`#cell${x}-${y}`);
        cell.classList.add("taken2");
        cell.textContent = this.player2.marker;
        this.nextMove(x, y);
    }


    miniMax(moveTable, isMinimizing) {
        let possibleMoves = new Array();
        for (let x = 0; x !== moveTable.length; x++) {
            for (let y = 0; y !== moveTable[x].length; y++) {
                if (moveTable[x][y] === 0) {
                    possibleMoves.push([x, y]);
                }
            }
        }
        const finalScore = this.checkWinner(moveTable, isMinimizing ? -1 : 1);
        if (finalScore !== null) {
            return finalScore; // * (possibleMoves.length + 1);
        }
        let bestScore = isMinimizing ?
            Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
        possibleMoves.forEach(([x, y]) => {
            moveTable[x][y] = isMinimizing ? -1 : 1;
            let score = this.miniMax(moveTable, !isMinimizing);
            moveTable[x][y] = 0;
            const checkFunction = isMinimizing ? Math.min : Math.max;
            bestScore = checkFunction(score, bestScore);
        });
        return bestScore;
    }

    nextMove(x, y) {
        console.log(`${this.#nextPlayer.name} played (${x}, ${y})`);
        this.#moves[x][y] = this.#nextPlayer.id;
        switch (this.checkWinner(this.#moves, this.#nextPlayer.id)) {
            case 1:
                console.log(`${this.player1.name} wins!`);
                this.endGame(this.player1);
                return;
            case -1:
                console.log(`${this.player2.name} wins!`);
                this.endGame(this.player2);
                return;
            case 0:
                console.log(`Draw!`)
                this.endGame();
                return;
            default:
                break;
        }
        if (this.#nextPlayer === this.player1) {
            this.#nextPlayer = this.player2;
            if (this.#aiGame) {
                this.aiTurn();
            }
        } else {
            this.#nextPlayer = this.player1;
        }
    }

    checkWinner(moveTable, playerId) {
        if ( // Check for horizontal wins
            moveTable[0].every(x => x === playerId) ||
            moveTable[1].every(x => x === playerId) ||
            moveTable[2].every(x => x === playerId) ||
            // Check for vertical wins
            moveTable.every(arr => arr[0] === playerId) ||
            moveTable.every(arr => arr[1] === playerId) ||
            moveTable.every(arr => arr[2] === playerId) ||
            // Check for diagonal wins
            [moveTable[0][0], moveTable[1][1], moveTable[2][2]].every(x => x === playerId) ||
            [moveTable[0][2], moveTable[1][1], moveTable[2][0]].every(x => x === playerId)
        ) {
            return playerId;
        } else if ( // Check for a draw
            Array().concat(...moveTable).every(x => x !== 0)
        ) {
            return 0;
        }
        return null;
    }

    endGame(winner) {
        const winMessage = document.querySelector("#winMessage");
        const cover = document.querySelector("#cover");
        winMessage.textContent = winner ? `${winner.name} wins!` : "Draw!";
        cover.classList.remove("hidden");
        winMessage.classList.remove("hidden");
    }
}

// Event Handler functions
function setAiGame(e) {
    const p2NameField = document.querySelector("#p2name");
    if (e.target.checked) {
        p2NameField.value = "";
        p2NameField.placeholder = "Computer";
    } else {
        p2NameField.placeholder = "Player 2";
    }
    p2NameField.disabled = e.target.checked;
}

function startGame(e, state, aiGame) {
    e.preventDefault();
    e.target.classList.add("hidden");
    const p1 = document.querySelector("#p1name").value || document.querySelector("#p1name").placeholder;
    const p2 = document.querySelector("#p2name").value || document.querySelector("#p2name").placeholder;
    state.game = new Game(p1, p2, aiGame);
    state.game.run();
}

function resetAll(e, state) {
    e.preventDefault();
    state.game.destructor();
    location.reload();
}

window.onload = function main() {
    let state = new Object();
    const againstAi = document.querySelector("#againstAi");
    againstAi.addEventListener("click", setAiGame);
    const submitReady = document.querySelector("#gameSetup");
    submitReady.addEventListener("submit", e => startGame(e, state, againstAi.checked));
    const overlay = document.querySelector("#cover");
    const winMessage = document.querySelector("#winMessage");
    overlay.addEventListener("click", e => resetAll(e, state));
    winMessage.addEventListener("click", e => resetAll(e, state));
}