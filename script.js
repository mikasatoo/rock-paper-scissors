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


// Create a function to randomly select the computer's selection
const choices = [rock, paper, scissors];  // An array for the options

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)]; // Math.floor rounds down to the largest integer, Math.random returns a random number between 0 and 1
}

let computerSelection = getComputerChoice();
console.log(computerSelection.value);


// Get input from the user
let playerChoice = prompt("Please enter your choice: Rock, Paper, or Scissors").toLowerCase();   // toLowerCase() function makes it case insensitive
console.log(playerChoice);


// Map the playerChoice variable to an object
let playerSelection;    // Declare new variable

if (playerChoice === "rock") {
    playerSelection = rock;
} else if (playerChoice === "paper") {
    playerSelection = paper;
} else if (playerChoice === "scissors") {
    playerSelection = scissors;
} else {
    console.error("Invalid choice. Please enter Rocks, Paper, or Scissors.")
}


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