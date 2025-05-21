const http = require('http');
http 
    .createServer((req, res) => {
        //write the logic to count to 10
        for(let i = 1; i <= 10; i++) {
            console.log(i);
            res.write(i.toString());
        }
        res.end();

    })
    .listen(3000);
console.log('Server running at http://localhost:3000/');