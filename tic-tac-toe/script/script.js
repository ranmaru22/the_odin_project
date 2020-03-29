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
    #scores = [0, 0, 0, 0, 0, 0, 0, 0];
    #turns = 0;
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
            this.nextMove(cell, this.#scores);
        }
    }

    aiTurn(scoreTable) {
        console.log("AI turn");
        let scoresClone = [...scoreTable];
        let possibleMoves = new Array();
        for (let move in this.#moves) {
            if (this.#moves[move] === "") {
                possibleMoves.push(move);
            }
        }
        console.log(possibleMoves);
        const moveScores = possibleMoves.map(
            (move) => this.miniMax(possibleMoves.filter(x => x !== move), move, scoresClone, false)
        );
        const nextMove = possibleMoves[moveScores.indexOf(Math.max(...moveScores))];
        console.log(moveScores);
        console.log(nextMove);
        this.#moves[nextMove] = this.player2.marker;
        const cell = document.querySelector(`#cell${nextMove}`);
        cell.classList.add("taken2");
        cell.textContent = this.player2.marker;
        this.nextMove(nextMove, this.#scores);
    }

    miniMax(possibleMoves, scoreTable, findMin) {
        const turnNo = 9 - possibleMoves.length;
        const gameOver = this.checkWin(scoreTable, turnNo);
        if (gameOver !== null) {
            return findMin ? gameOver + turnNo : gameOver - turnNo;
        }

        if (findMin) {
            let lowest = Infinity;
            for (const move of possibleMoves) {
                const remainingMoves = possibleMoves.filter(x => x !== move);
                const newScoreTable = this.updateScores(move, this.player2, [...scoreTable]);
                const score = this.miniMax(remainingMoves, newScoreTable, false);
                if (score < lowest) {
                    lowest = score;
                }
            }
            return lowest;
        } else {
            let highest = -Infinity;
            for (const move of possibleMoves) {
                const remainingMoves = possibleMoves.filter(x => x !== move);
                const newScoreTable = this.updateScores(move, this.player1, [...scoreTable]);
                const score = this.miniMax(remainingMoves, newScoreTable, true);
                if (score > highest) {
                    highest = score;
                }
            }
            return highest;
        }
    }

    nextMove(cell, scoreTable) {
        console.log(`${this.#nextPlayer.name} played ${cell}`);
        scoreTable = this.updateScores(Number(cell), this.#nextPlayer, scoreTable);
        const gameOver = this.checkWin(scoreTable, ++this.#turns);
        switch (gameOver) {
            case 10:
                console.log(`${this.player1.name} wins!`);
                this.endGame(this.player1);
                return;
            case -10:
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
                this.aiTurn(scoreTable);
            }
        } else {
            this.#nextPlayer = this.player1;
        }
    }

    updateScores(cell, player, scoreTable) {
        const delta = (player === this.player1) ? 1 : -1;
        scoreTable[cell % 3] += delta;
        scoreTable[Math.floor(cell / 3 + 3)] += delta;
        if (cell === 0 || cell === 4 || cell === 8) {
            scoreTable[6] += delta;
        }
        if (cell === 2 || cell === 4 || cell === 6) {
            scoreTable[7] += delta;
        }
        return scoreTable;
    }

    checkWin(scoreTable, turnNo) {
        if (Math.max(...scoreTable) === 3) {
            return 10;
        } else if (Math.min(...scoreTable) === -3) {
            return -10;
        } else if (turnNo === 9) {
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
    submitReady.addEventListener("submit", (e) => startGame(e, state, againstAi.checked));
    const overlay = document.querySelector("#cover");
    const winMessage = document.querySelector("#winMessage");
    overlay.addEventListener("click", (e) => resetAll(e, state));
    winMessage.addEventListener("click", (e) => resetAll(e, state));
}