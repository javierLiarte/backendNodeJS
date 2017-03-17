const http = require('http');
const hostname = '127.0.0.1';
const port = '3000';

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}).listen(port, hostname, (err) => {
    if (err) throw new Error(err);
    
    console.log(`Server is running on port http://${hostname}:${port}`);
});