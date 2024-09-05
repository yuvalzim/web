const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer( (req, res) => {
    console.log(req.url);

    var currentPath = path.dirname(path.dirname(__filename));

    // Get the url
    url = req.url;
    
    // Check for home page request
    if (url == '/'){
        res.statusCode = 301;
        res.setHeader('Location', '/login.html');
        res.end();
    }

    if (url == "/login") {
        url += ".html";
    }

    currentPath += url


    if (fs.existsSync(currentPath)) {
        res.statusCode = 200;
    }
    else {
        res.statusCode = 404;
    }

    // Read the requested url and send it to the browser
    fs.readFile(currentPath, (err, data) => {
        if (err){
            console.log(err);
        }
        res.end(data);
    })


})

server.listen(8888, '0.0.0.0')



