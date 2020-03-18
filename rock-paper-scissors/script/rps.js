function computerPlay() {
    choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection = computerPlay()) {
    var ret;
    var result = 0;
    // 0 = draw, 1 = player win, 2 = computer win
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
    return [ret, result];
}

function game(numRounds = 5) {
    var playerScore = 0;
    var computerScore = 0;
    var playerSelection;
    var result;
    for (var i = 0; i < numRounds; ++i) {
        playerSelection = prompt("Rock, paper, or scissors?");
        result = playRound(playerSelection);
        if (result[1] === 1) {
            ++playerScore;
        } else if (result[1] === -1) {
            ++computerScore;
        }
        alert(`${result[0]}\nYour current score is ${playerScore}.`);
    }
    if (playerScore > computerScore) {
        alert(`Congratulations, you win with a score of ${playerScore}!`);
    } else if (playerScore < computerScore) {
        alert(`Sorry, the computer beat you ${computerScore} to ${playerScore}.`);
    } else {
        alert(`Oops, this round was a draw. You both got ${playerScore} points.`);
    }
}

game();