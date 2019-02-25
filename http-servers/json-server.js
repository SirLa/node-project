const http = require('http');
const port = 3000;
const server = http.createServer(requestHandler);

const product = {
    id: 1,
    name: "Supreme T-Shirt",
    brand: "Supreme,",
    price: 99.99,
    options: [
        {color: "blue"},
        {size: "XL"}
    ]
}
function requestHandler(request, response) {
    response.writeHead(200, {'Content-Type': 'JSON'});
    response.end(JSON.stringify(product));
};

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});