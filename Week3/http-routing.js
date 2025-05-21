const http = require('http');
http
    .createServer((req, res) => {
        //write headers
        res.writeHead(200, { "Content-Type": "text/html" });

        //for middleware
        console.log(req);
        let path = req.url;
        if (path === "/") {
            showHomePage(req, res);
        } else if (path == "/about") {
            showAboutPage(req, res);
        } else if (path == "/contact") {
            res.write("<h1>Send me an email</h1>");
        } else {
            res.write("<h1>404 Not Found</h1>");
        }

        // //Challenge : we need to show different content based on the url path
        // console.log(req);
        // let path = req.url;
        // if (path === "/") {
        //     res.write("<h1>Welcome to my node web page!</h1>");
        // } else if (path == "/about") {
        //     res.write("<h1>Here is my information page</h1>");
        // } else if (path == "/contact") {
        //     res.write("<h1>Send me an email</h1>");
        // } else {
        //     res.write("<h1>404 Not Found</h1>");
        // }

        // //write page content
        // res.write("<h1>Welcome to my server</h1>");

        //finalize the response
        res.end();
    })
    .listen(3000);
console.log("Server is running at http://localhost:3000/");

//Middleware Functions
function showHomePage(req, res) {
    res.write("<h1>Welcome to my node web page!</h1>");
}
function showAboutPage(req, res) {
    res.write("<h1>Welcome to my About web page!</h1>");
}
