const http = require('http');
const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(request, response) {
    console.log(request.url, "++++++++");
    response.writeHead(200, {'Content-Type': 'plain text'});
    response.end('Hello world!');
};

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});