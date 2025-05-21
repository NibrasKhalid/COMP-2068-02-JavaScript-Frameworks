//import connect
const connect = require('connect');
//create an app object
//this object represents my web app server and i can use it to configure its behaviour
const app = connect();
//listen on port 3000
app.listen(3000);
//print msg to console to indicate that the server is running
console.log("Server is  running at http://localhost:3000/");
//Define middleware functions
function homePage(req,res,next){
    res.write("Welcome to my home page!");
    res.end();
}
//associate middleware functions with routes
//globally for all requests
app.use(homePage);