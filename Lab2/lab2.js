//this is my entrypoint defined in package.json
//the program must implement prompt package 
//install it via npm before implementing the code
const prompt = require('prompt');
//start the prompt
prompt.start();
//prompt the user for value, provide feedback
//first param is an array of values we want
//second param is a callback function that will be called when the user finishes entering values
prompt.get(['choice'], function (err, result) {
    if (err) {
        console.error("Error:", err);
        return;
    }
    //retrieve the value from the result object by name
    //name must match the one given in array
    let userChoice = result.choice.toLowerCase().trim();
    let computerChoice;

    //for RPS here you will generate computer selection, compare it with user selection and print the result
    let random = Math.random();
    if (random < 0.35) {
        computerChoice = 'paper';
    } else if (random < 0.68) {
        computerChoice = 'scissors';
    } else {
        computerChoice = 'rock';
    }

    //do something with the value
    console.log("You entered: " + userChoice);
    console.log("Computer chose: " + computerChoice);
    
    //Checking win conditions
    if(userChoice === computerChoice){
        console.log("It's a tie!");
    } else if(userChoice === "rock" && computerChoice === "scissors"){
        console.log("User wins!");
    } else if(userChoice === "scissors" && computerChoice === "paper"){
        console.log("User wins!");
    } else if(userChoice === "paper" && computerChoice === "rock"){
        console.log("User wins!");
    } else if(userChoice === "scissors" && computerChoice === "rock"){
        console.log("Computer wins!");
    } else if(userChoice === "paper" && computerChoice === "scissors"){
        console.log("Computer wins!");
    } else if(userChoice === "rock" && computerChoice === "paper"){
        console.log("Computer wins!");
    } else {
        console.log("Invalid entry");
    }
})
;