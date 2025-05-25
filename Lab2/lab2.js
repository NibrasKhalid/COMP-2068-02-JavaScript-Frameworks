//this is my entrypoint defined in package.json
//the program must implement prompt package 
//install it via npm before implementing the code
const prompt = require('prompt-sync');
//start the prompt
prompt.start();
//prompt the user for value, provide feedback
//first param is an array of values we want
//second param is a callback function that will be called when the user finishes entering values
prompt.get(['choice'], function (err, result) {
    //retrieve the value from the result object by name
    //name must match the one given in array
    let userChoice = result.choice;
    let computerChoice;
    //do something with the value
    console.log('You entered: ' + userChoice);

    //for RPS here you will generate computer selection, compare it with user selection and print the result
    let random = Math.random();;
    switch (random) {
        case random > 0 && random < 0.35:
            computerChoice = 'Paper';
            break;
        case random > 0.35 && random < 0.68:
            computerChoice = 'Scissors';
            break;
        case random > 0.68 && random < 1.01:
            computerChoice = 'rock';
            break;
    }
})
;