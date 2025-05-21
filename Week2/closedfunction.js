//this function follows closure pattern
//variable declared inside of this function are not accessible outside of this function
//but the variable declared outside of this function are accessible inside of this function

function count() {
    //local scope
    let counter = 0
    //declare inner function to increase
    function increment() {
        counter++;
        console.log(counter);
    }
    //decrement function to decrease the counter
    function decrement() {
        counter--;
        console.log(counter);
    }
    //return the inner function definition when calling count()
    return {increment, decrement};
}
//this works similar to creating an instance of an object in OOP languages like C#
//var obj = new Object()
// this returns the inner function definition and stores them in the variable counter;
const counter = count();
//now call the inner functions 
counter.increment(); 
counter.increment();
counter.increment();
counter.decrement(); 
counter.decrement();
