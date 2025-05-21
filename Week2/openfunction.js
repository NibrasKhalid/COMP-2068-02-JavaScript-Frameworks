//this is a regular javascript function
//it is not a closure

//to achieve this we need to declare a variable outside the function
let counter = 0

function count() {
    //declare var to store count
    // let counter = 0
    //increase count by 1
    counter++;
    //print to console
    console.log(counter);
}

//call it three times to verify
count(); 
count(); 
count(); 
