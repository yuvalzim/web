const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    console.log(req);


    // Get the url
    url = req.url.slice(1);
    
    // Check for home page request
    if (!url){
        url = 'index.html'
    }

    // Read the requested url and send it to the browser
    fs.readFile('D:\\game\\' + url, (err, data) => {
        if (err){
            console.log(err);
        }
        res.end(data);
    })


})

server.listen(8888, '0.0.0.0')



