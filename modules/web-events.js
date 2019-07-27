const http = require('http')
const EventEmitter = require('events')

const server = http.createServer();
server.on('request', (request, response) => {
    console.log('Request received');
    console.log(request.url);
    response.end('Request received');
});

server.on('request', (request, response) => {
    console.log('Another Request :-)');
    response.end('Another Request :-)');
});

server.on('close', () => {
    console.log('server closed for business');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server online');
});
