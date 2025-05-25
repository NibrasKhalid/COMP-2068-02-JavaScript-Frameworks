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
    let userSelection = result.choice.toLowerCase().trim();

    let computerSelection;

    //for RPS here you will generate computer selection, compare it with user selection and print the result
    let random = Math.random();
    if (random < 0.35) {
        computerSelection = 'paper';
    } else if (random < 0.68) {
        computerSelection = 'scissors';
    } else {
        computerSelection = 'rock';
    }

    //do something with the value
    console.log("You entered: " + userSelection);
    console.log("Computer chose: " + computerSelection);
    
    //Checking win conditions
    if(userSelection === computerSelection){
        console.log("It's a tie!");
    } else if(userSelection === "rock" && computerSelection === "scissors"){
        console.log("User wins!");
    } else if(userSelection === "scissors" && computerSelection === "paper"){
        console.log("User wins!");
    } else if(userSelection === "paper" && computerSelection === "rock"){
        console.log("User wins!");
    } else if(userSelection === "scissors" && computerSelection === "rock"){
        console.log("Computer wins!");
    } else if(userSelection === "paper" && computerSelection === "scissors"){
        console.log("Computer wins!");
    } else if(userSelection === "rock" && computerSelection === "paper"){
        console.log("Computer wins!");
    } else {
        console.log("Invalid entry");
    }
})
;