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

// Get reference to elements
const resultsOutput = document.querySelector(".results h2");
const results = document.querySelector(".results");
const playerScoreValue = document.querySelector("#player-score-value");
const computerScoreValue = document.querySelector("#computer-score-value");
const finalResult = document.querySelector(".final-result");
const choiceButtons = document.querySelectorAll(".choice-buttons button");
const playerImg = document.querySelector("#player-img");
const computerImg = document.querySelector("#computer-img");

// Create a button element stored in the playAgain variable
let playAgain = document.createElement("button");
playAgain.setAttribute("id", "playAgain");
playAgain.classList.add("button-hover");

// Set default values
let playerScore = 0;
let computerScore = 0;
playerScoreValue.textContent = `${playerScore}`;
computerScoreValue.textContent = `${computerScore}`;
resultsOutput.textContent = "Results";
playerImg.setAttribute("src", "./images/question.png");
computerImg.setAttribute("src", "./images/question.png");

// Create playerChoice variable
let playerChoice;

// Create a function to capitalize the first letter of the choice
function capitalizeFirstLetter(string) {
    let capitalizedChoice;
    return capitalizedChoice = string.charAt(0).toUpperCase() + string.slice(1);
}

// Create a function that gives the results of each round
function getResults(playerChoice) {
    // match event id to one of the choices objects
    let playerSelection = choices[playerChoice];
    // call the capitalizeFirstLetter() function
    let capPlayerSelection = capitalizeFirstLetter(playerSelection.value);

    // call the getComputerChoice() function
    let computerSelection = getComputerChoice();
    // call the capitalizeFirstLetter() function
    let capComputerSelection = capitalizeFirstLetter(computerSelection.value);

    // update src attribute for images
    playerImg.setAttribute("src", `./images/${playerSelection.value}.png`);
    computerImg.setAttribute("src", `./images/${computerSelection.value}.png`);

    // call the playRound() function - set resultsOutput text content and track the score
    let winner = playRound(playerSelection, computerSelection);
    if (winner === "player") {
        resultsOutput.textContent = `You win! ${capPlayerSelection} beats ${computerSelection.value}`;
        playerScore += 1;
    } else if (winner === "computer") {
        resultsOutput.textContent = `You lose! ${capComputerSelection} beats ${playerSelection.value}`;
        computerScore += 1;
    } else {
        resultsOutput.textContent = "It's a tie!";
    }

    // set score values' text content
    playerScoreValue.textContent = `${playerScore}`;
    computerScoreValue.textContent = `${computerScore}`;

    // if either score has reached 5, then call the getFinalResult() function
    if (playerScore === 5 || computerScore === 5) {
        getFinalResult();
    }
}

// Create a function that adds an event listener to the choiceButtons
function makeChoicesClickable() {
    const choiceButtons = document.querySelectorAll(".choice-buttons button");

    choiceButtons.forEach((choiceButton) => {
        choiceButton.addEventListener("click", function eventHandler() {
            // if the finalResult div is empty, call the getResults() function
            // else, remove the event listener
            if (finalResult.textContent === "") {
                getResults(choiceButton.id);    // need to provide value of playerChoice variable
            } else {
                choiceButton.removeEventListener("click", eventHandler);
            }
        });
    });
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

    results.appendChild(playAgain);

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
    playerScoreValue.textContent = `${playerScore}`;
    computerScoreValue.textContent = `${computerScore}`;

    // reset roundResult and finalResult divs and remove playAgain button
    resultsOutput.textContent = "Results";
    finalResult.textContent = "";
    results.removeChild(playAgain);

    // change images back to question marks
    playerImg.setAttribute("src", "./images/question.png");
    computerImg.setAttribute("src", "./images/question.png");

    // call the makeChoicesClickable() function again
    makeChoicesClickable();

    // toggle button-hover class back on for the choice buttons
    choiceButtons.forEach((choiceButton) => {
        choiceButton.classList.toggle("button-hover");
    });
}

// Call the makeChoicesClickable function to begin
makeChoicesClickable();

// Add event listener to the playAgain button that calls the resetGame() function
// (need to use event delegation since the playAgain button is dynamically created)
document.addEventListener("click", function(e) {
    const target = e.target.closest("#playAgain");

    if (target) {
        resetGame();
    }
});