function computerPlay() {
    choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection = computerPlay()) {
    var ret;
    var result = 0;
    // 0 = draw, 1 = player win, -1 = computer win
    if (playerSelection.toLowerCase() == "rock") {
        switch (computerSelection) {
            case "rock":
                ret = "Draw!";
                break;
            case "paper":
                ret = "You lose. Paper beats rock.";
                result--;
                break;
            case "scissors":
                ret = "You win! Rock beats scissors.";
                result++;
                break;
        }
    } else if (playerSelection.toLowerCase() == "paper") {
        switch (computerSelection) {
            case "rock":
                ret = "You win! Paper beats rock.";
                result++;
                break;
            case "paper":
                ret = "Draw!";
                break;
            case "scissors":
                ret = "You lose. Scissors beat paper.";
                result--;
                break;
        }
    } else if (playerSelection.toLowerCase() == "scissors") {
        switch (computerSelection) {
            case "rock":
                ret = "You lose. Rock beats scissors.";
                result--;
                break;
            case "paper":
                ret = "You win! Scissors beat paper.";
                result++;
                break;
            case "scissors":
                ret = "Draw!";
                break;
        }
    }
    return [ret, result, playerSelection, computerSelection];
}

function isGameOver(playerScore, computerScore) {
    if (playerScore === 5) {
        alert("Congratulations, you win!");
        return true;
    } else if (computerScore === 5) {
        alert("Sorry, you lose. Better luck next time.");
        return true;
    }
    return false;
}

function clearScreen() {
    const playerArea = document.querySelector("#player>p");
    playerArea.textContent = "";
    const compArea = document.querySelector("#computer>p");
    compArea.textContent = "";
    const resultDisplay = document.querySelector("#results>p");
    resultDisplay.textContent = "";
}

function displayResults(results) {
    const playerArea = document.querySelector("#player>p");
    playerArea.textContent = results[2];
    const compArea = document.querySelector("#computer>p");
    compArea.textContent = results[3];
    const resultDisplay = document.querySelector("#results>p");
    resultDisplay.textContent = results[0];
}

function showScores(results) {
    const pScore = document.querySelector("#pScore>p>.scoreNum");
    const cScore = document.querySelector("#cScore>p>.scoreNum");
    if (results[1] === 1) {
        ++pScore.textContent;
    } else if (results[1] === -1) {
        ++cScore.textContent;
    }
    if (isGameOver(Number(pScore.textContent), Number(cScore.textContent))) {
        pScore.textContent = 0;
        cScore.textContent = 0;
        clearScreen();
    }
}

function game(e) {
    var results = playRound(e.target.value);
    displayResults(results);
    showScores(results);
}

window.onload = function main() {
    const rockButton = document.querySelector("#rockBtn");
    const paperButton = document.querySelector("#paperBtn");
    const scissorsButton = document.querySelector("#scissorsBtn");

    rockButton.addEventListener("click", game);
    paperButton.addEventListener("click", game);
    scissorsButton.addEventListener("click", game);
}