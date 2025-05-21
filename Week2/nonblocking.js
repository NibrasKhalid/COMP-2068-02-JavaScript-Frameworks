//This is the asynchronous version of the code
//note that node is asynchronous by default and its modules are also asynchronous
//We'll use the same fs module but will call the operations differently
const fs = require('fs');
//Use readfile instead of readfilesync and provide a callback function to handle the result of the operation
fs.readFile('food.txt', 'utf8', (err, data) => {
    //usually you'll check for errors first
    //if there is an error, log it and return
    //skip and show the data
    console.log(data);
});
//print an additional line to show that the program is still running
console.log('This food is delicious!');

//do the same with drinks
fs.readFile('drinks.txt', 'utf8', (err, data) => {
    //usually you'll check for errors first
    //if there is an error, log it and return
    //skip and show the data
    console.log(data);
});
//print an additional line to show that the program is still running
console.log('This drink is refreshing!');