// Create objects for each option
const rock = {  // These objects store multiple values in a single variable
    value: "rock",  // Each property is a key: value pair
    beats: "scissors",
    losesTo: "paper"
}

const paper = {
    value: "paper",
    beats: "rock",
    losesTo: "scissors"
}

const scissors = {
    value: "scissors",
    beats: "paper",
    losesTo: "rock"
}

const choices = {
    rock,
    paper, 
    scissors
}

// Create a function to randomly select the computer's selection
function getComputerChoice() {
    const randomChoice = Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)]  // Math.floor rounds down to the largest integer, Math.random returns a random number between 0 and 1
    return choices[randomChoice]; 
}

// Create a function that plays a single round of rock paper scissors
function playRound(playerSelection, computerSelection) {
    let winner;
    if (playerSelection.beats === computerSelection.value) {
        winner = "player";
    } else if (playerSelection.losesTo === computerSelection.value) {
        winner = "computer";
    } else {
        winner = "";
    }
    return winner;
}

// Get reference to "results-output" div
const resultsOutput = document.querySelector(".results-output");

// Create new div elements stored in the roundResult, score, and finalResult variables
// + a button element stored in the playAgain variable
let roundResult = document.createElement("div");
let score = document.createElement("div");
let finalResult = document.createElement("div");
finalResult.setAttribute("id", "finalResult");
let playAgain = document.createElement("button");
playAgain.setAttribute("id", "playAgain");
playAgain.classList.add("button-hover");

// Set both scores to zero to begin with
let playerScore = 0;
let computerScore = 0;

// Create playerChoice variable
let playerChoice;

// Create a function that gives the results of each round
function getResults(playerChoice) {
    // match event id to one of the choices objects
    let playerSelection = choices[playerChoice];
    let capPlayerSelection = playerSelection.value.charAt(0).toUpperCase() + playerSelection.value.slice(1);

    // call the getComputerChoice() function
    let computerSelection = getComputerChoice();
    let capComputerSelection = computerSelection.value.charAt(0).toUpperCase() + computerSelection.value.slice(1);

    // call the playRound() function - set roundResult text content and track the score
    let winner = playRound(playerSelection, computerSelection);
    if (winner === "player") {
        roundResult.textContent = `You win this round! ${capPlayerSelection} (you) beats ${computerSelection.value} (computer) :)`;
        playerScore += 1;
    } else if (winner === "computer") {
        roundResult.textContent = `You lose this round! ${capComputerSelection} (computer) beats ${playerSelection.value} (you) :(`;
        computerScore += 1;
    } else {
        roundResult.textContent = "You tied this round! :o";
    }

    // set score text content
    score.textContent = `The score is player: ${playerScore} to computer: ${computerScore}`;

    // append roundResult and score to results-output div
    resultsOutput.appendChild(roundResult);
    resultsOutput.appendChild(score);

    // if either score has reached 5, then call the getFinalResult() function
    if (playerScore === 5 || computerScore === 5) {
        getFinalResult();
    }
}

// Create a function that gives the final result and option to play again (once a score of 5 is reached)
function getFinalResult() {
    if (playerScore === 5) {
        finalResult.textContent = "Yay! You won the game 😃";
        playAgain.textContent = "Want to play again?";
    } else if (computerScore === 5) {
        finalResult.textContent = "Too bad! You lost the game 🙁";
        playAgain.textContent = "Want to try again?"
    };

    resultsOutput.appendChild(finalResult);
    resultsOutput.appendChild(playAgain);

    // toggle button-hover class off for the choice buttons
    choiceButtons.forEach((choiceButton) => {
        choiceButton.classList.toggle("button-hover");
    });
}

// Create function that resets the game
function resetGame() {
    // reset scores
    playerScore = 0;
    computerScore = 0;

    // remove roundResult, score, and finalResult divs and this playAgain button
    resultsOutput.removeChild(roundResult);
    resultsOutput.removeChild(score);
    resultsOutput.removeChild(finalResult);
    resultsOutput.removeChild(playAgain);

    // toggle button-hover class back on for the choice buttons
    choiceButtons.forEach((choiceButton) => {
    choiceButton.classList.toggle("button-hover");
    });
}

// Add event listeners to each button within the "choice-buttons" class ancestor
const choiceButtons = document.querySelectorAll(".choice-buttons button");

choiceButtons.forEach((choiceButton) => {
    choiceButton.addEventListener("click", function(e) {
        // if the finalResult div does not exist, call the getResults() function
        // else, remove the event listener
        if (document.getElementById("finalResult") === null) {
            getResults(choiceButton.id);    // need to provide value of playerChoice variable
        } else {
            choiceButton.removeEventListener("click", eventHandler);
        }
    });
});

// Add event listener to the playAgain button that calls the resetGame() function
// (need to use event delegation since the playAgain button is dynamically created)
document.addEventListener("click", function(e) {
    const target = e.target.closest("#playAgain");

    if (target) {
        resetGame();
    }
});