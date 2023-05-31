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

// Set both scores to zero to begin with
let playerScore = 0;
let computerScore = 0;

// Loop through the process 5 times (5 rounds per game)
for (i = 1; i <= 5; i++) {
    // Call the getComputerChoice() function
    let computerSelection = getComputerChoice();

    // Get input from the user and may the string to one of the above objects
    let playerChoice = prompt("Please enter your choice: Rock, Paper, or Scissors").toLowerCase();   // toLowerCase() function makes it case insensitive
    let playerSelection = choices[playerChoice]

    // Call the compareChoices() function and keep track of the score
    let winner = compareChoices(playerSelection, computerSelection);
    if (winner === "player") {
        playerScore += 1;
    } else if (winner === "computer") {
        computerScore += 1;
    }
}

// At the end of the loop, print the overall winner and score
if (playerScore > computerScore) {
    console.log(`You won the game! The final score is player: ${playerScore} to computer: ${computerScore}.`);
} else if (playerScore < computerScore) {
    console.log(`You lost the game! The final score is player: ${playerScore} to computer: ${computerScore}.`);
} else {
    console.log(`You have tied! The final score is player: ${playerScore} to computer: ${computerScore}.`);
}

// Create a function to randomly select the computer's selection
function getComputerChoice() {
    const randomChoice = Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)]  // Math.floor rounds down to the largest integer, Math.random returns a random number between 0 and 1
    return choices[randomChoice]; 
}

// Create a function that plays a single round of rock paper scissors
function compareChoices(playerSelection, computerSelection) {
    let winner;
    if (playerSelection.beats === computerSelection.value) {
        console.log(`You win! ${playerSelection.value} beats ${computerSelection.value} :)`);
        winner = "player";
    } else if (playerSelection.losesTo === computerSelection.value) {
        console.log(`You lose! ${computerSelection.value} beats ${playerSelection.value} :(`);
        winner = "computer";
    } else {
        console.log("You have tied! :o");
    }
    // debugger
    return winner;
}