"use strict";

class Gameboard {
    constructor(domElem) {
        this.domElem = domElem;
        this.board = new Array(9);
    }

    drawToScreen() {
        for (let cell = 0; cell !== this.board.length; cell++) {
            const nextCell = document.createElement("div");
            nextCell.setAttribute("id", `cell${cell}`);
            nextCell.classList.add("cell");
            nextCell.textContent = cell;
            this.domElem.appendChild(nextCell);
        }
    }
}

class Player {
    constructor(name, marker, aiPlayer) {
        this.name = aiPlayer ? "Computer" : name;
        this.marker = marker;
    }
}

class Game {
    #boardDiv = document.querySelector("#gameboard");
    #moves = new Array(9).fill("");
    #nextPlayer;
    #aiGame;

    constructor(p1name, p2name, aiGame = false) {
        this.player1 = new Player(p1name, "X");
        this.player2 = new Player(p2name, "O");
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
        cells.forEach((cell) => cell.addEventListener("click", (e) => this.turnHandler(e)));
    }

    turnHandler(event) {
        let mark = event.target.textContent;
        if (mark !== this.player1.marker && mark !== this.player2.marker) {
            event.target.textContent = this.#nextPlayer.marker;
            event.target.classList.add((this.#nextPlayer === this.player1) ? "taken1" : "taken2");
            const cell = event.target.getAttribute("id").slice(-1);
            this.#moves[cell] = this.#nextPlayer.marker;
            this.nextMove(cell);
        }
    }

    aiTurn() {
        console.log("AI turn");
        let possibleMoves = new Array();
        for (let move in this.#moves) {
            if (this.#moves[move] === "") {
                possibleMoves.push(move);
            }
        }
        console.log(possibleMoves);
        let dummyMoveTable = [...this.#moves];
        const moveScores = possibleMoves.map(
            (move) => this.miniMax(possibleMoves.filter(x => x !== move), false)
        );
        const nextMove = possibleMoves[moveScores.indexOf(Math.min(...moveScores))];
        console.log(moveScores);
        console.log(nextMove);
        this.#moves[nextMove] = this.player2.marker;
        const cell = document.querySelector(`#cell${nextMove}`);
        cell.classList.add("taken2");
        cell.textContent = this.player2.marker;
        this.nextMove(nextMove);
    }


    miniMax(possibleMoves, findMin) {
        const gameOver = this.checkWiner();
        if (gameOver !== null) {
            return gameOver;
        }

        if (findMin) {
            let best = Infinity;
            for (const move of possibleMoves) {
                const remainingMoves = possibleMoves.filter(x => x !== move);
                const newScoreTable = this.updateScores(move, this.player2, scoreTable);
                const score = this.miniMax(remainingMoves, newScoreTable, false);
                best = Math.min(score, best);
            }
            return best;
        } else {
            let best = -Infinity;
            for (const move of possibleMoves) {
                const remainingMoves = possibleMoves.filter(x => x !== move);
                const newScoreTable = this.updateScores(move, this.player1, scoreTable);
                const score = this.miniMax(remainingMoves, newScoreTable, true);
                best = Math.max(score, best);
            }
            return best;
        }
    }

    nextMove(cell) {
        console.log(`${this.#nextPlayer.name} played ${cell}`);
        const gameOver = this.checkWinner(this.#moves);
        switch (gameOver) {
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

    checkWinner(moveTable) {
        const p1Marker = this.player1.marker;
        const p2Marker = this.player2.marker;
        if (
            // Check horizontal wins
            (moveTable[0] === p1Marker &&
                moveTable[1] === p1Marker &&
                moveTable[2] === p1Marker) ||
            (moveTable[3] === p1Marker &&
                moveTable[4] === p1Marker &&
                moveTable[5] === p1Marker) ||
            (moveTable[6] === p1Marker &&
                moveTable[7] === p1Marker &&
                moveTable[8] === p1Marker) ||
            // Check horizontal wins
            (moveTable[0] === p1Marker &&
                moveTable[3] === p1Marker &&
                moveTable[6] === p1Marker) ||
            (moveTable[1] === p1Marker &&
                moveTable[4] === p1Marker &&
                moveTable[7] === p1Marker) ||
            (moveTable[2] === p1Marker &&
                moveTable[5] === p1Marker &&
                moveTable[8] === p1Marker) ||
            // Check diagonal wins
            (moveTable[0] === p1Marker &&
                moveTable[4] === p1Marker &&
                moveTable[8] === p1Marker) ||
            (moveTable[2] === p1Marker &&
                moveTable[4] === p1Marker &&
                moveTable[6] === p1Marker)
        ) {
            return 1;
        } else if (
            // Check horizontal wins
            (moveTable[0] === p2Marker &&
                moveTable[1] === p2Marker &&
                moveTable[2] === p2Marker) ||
            (moveTable[3] === p2Marker &&
                moveTable[4] === p2Marker &&
                moveTable[5] === p2Marker) ||
            (moveTable[6] === p2Marker &&
                moveTable[7] === p2Marker &&
                moveTable[8] === p2Marker) ||
            // Check horizontal wins
            (moveTable[0] === p2Marker &&
                moveTable[3] === p2Marker &&
                moveTable[6] === p2Marker) ||
            (moveTable[1] === p2Marker &&
                moveTable[4] === p2Marker &&
                moveTable[7] === p2Marker) ||
            (moveTable[2] === p2Marker &&
                moveTable[5] === p2Marker &&
                moveTable[8] === p2Marker) ||
            // Check diagonal wins
            (moveTable[0] === p2Marker &&
                moveTable[4] === p2Marker &&
                moveTable[8] === p2Marker) ||
            (moveTable[2] === p2Marker &&
                moveTable[4] === p2Marker &&
                moveTable[6] === p2Marker)
        ) {
            return -1;
        } else if (!moveTable.includes("")) {
            return 0;
        }
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
    submitReady.addEventListener("submit", (e) => startGame(e, state, againstAi.checked));
    const overlay = document.querySelector("#cover");
    const winMessage = document.querySelector("#winMessage");
    overlay.addEventListener("click", (e) => resetAll(e, state));
    winMessage.addEventListener("click", (e) => resetAll(e, state));
}