const http = require("http");
const server = http.createServer(requestHandler);
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const { Transform } = require("stream");

class ReplaceStream extends Transform {
    constructor(data) {
        super();
        this.data = data;
    }
    _transform(chunk, encoding, done) {
        let modifiedChunk = chunk.toString('utf8');
        const dataArr = Object.keys(this.data);
        for (const value of dataArr) {
            const pattern = new RegExp(`{${value}}`, 'g');
            if (modifiedChunk.match(pattern)) {
                modifiedChunk = modifiedChunk.replace(pattern, this.data[value]);
            }
        }
        this.push(modifiedChunk);
        done();
    }
}[]

function requestHandler(req, res) {
    const readStream = fs.createReadStream(path.join(__dirname, 'index.html'), 'utf8');
    const replaceStream = new ReplaceStream({
        message: 'Hello, World!!'
    });
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream
        .pipe(replaceStream)
        .pipe(res);
}

server.listen(PORT, err => {
    if (err) return console.log('Something went wrong.', err);
    console.log(`Server is listening on port ${PORT}`);
});