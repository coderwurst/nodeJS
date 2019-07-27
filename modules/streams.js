const fs = require('fs');
const server = require('http').createServer();

server.on('request', (request, response) => {
    // 1. standard - node loads entire file into memory and sends at once - not prod ready
    // fs.readFile('test-file.txt', (error, data) => {
    //    if (error) console.log(error);
    //    response.end(data);
    // });

    // 2. streams - store each chunk and emit to data
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', (chunk) => {
    //     response.write(chunk);
    // });
    // // once no more data to be read, end emitter will be sent
    // readable.on('end', () => {
    //     response.end();
    //     console.log('transmission complete');
    // });
    // readable.on('error', (error) => {
    //     console.log(error);
    //     response.statusCode  = 500;
    //     response.end('file not found');
    // })

    // 3. pipe operator to pipe output of readable stream into input of writeable stream (response)
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(response);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server online_');
});
