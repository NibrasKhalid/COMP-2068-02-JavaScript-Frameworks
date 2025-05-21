//this is an example of blocking code
// this program will read each file and print its contents
//We'll use the fs (filesystemm)core module to do so
//Use the require function to load the fs module into the declared constant
const fs = require('fs');

//by default, most node modules are asynchronous in nature, use the synchronous version of the methods if available 
let food = fs.readFileSync('food.txt', 'utf8'); 
console.log(food);
//print an additional line to show that the program is still running
console.log('This food was delicious!');

//do the same with the drinks file 
let drinks = fs.readFileSync('drinks.txt', 'utf8');
console.log(drinks);
console.log('This drink was refreshing!');

//Whats the execution sequence?
//WHat is the expected output?