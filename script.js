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

function getComputerChoice() {
    // Math.floor rounds down to the largest integer, Math.random returns a random number between 0 and 1
    const randomChoice = Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)]
    return choices[randomChoice]; 
}

let computerSelection = getComputerChoice();

// Get input from the user
let playerChoice = prompt("Please enter your choice: Rock, Paper, or Scissors").toLowerCase();   // toLowerCase() function makes it case insensitive

// Map the playerChoice variable (currently a string) to an object
let playerSelection = choices[playerChoice]

// Create a function that plays a single round of rock paper scissors
function compareChoices(playerSelection, computerSelection) {
    if (playerSelection.beats === computerSelection.value) {
        console.log(`You win! ${playerSelection.value} beats ${computerSelection.value} :)`);
    } else if (playerSelection.losesTo === computerSelection.value) {
        console.log(`You lose! ${computerSelection.value} beats ${playerSelection.value} :(`);
    } else {
        console.log("You have tied! :o");
    }
}

compareChoices(playerSelection, computerSelection);