const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
// default 4, decrease to increase time taken for crypto
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => {
    console.log('Timer 1 finished');
}, 0);

setImmediate(() => {
    console.log('Immediate 1 finished');
});

fs.readFile('text-file.txt', () => {
    console.log("I/O Finished");
    console.log("==================");
    console.log("====Event Loop====");

    // functions within EventLoop
    setTimeout(() => {
        console.log('Timer 2 finished');
    }, 0);

    setTimeout(() => {
        console.log('Timer 3 finished');
    }, 3000);

    // executes once per tick
    setImmediate(() => {
        console.log('Immediate 2 finished');
    });

    // microtasks queue, executed after each phase
    process.nextTick(() => {
        console.log('Process.nextTick')
    });

    // sync version of crypto without callback - BLOCKER!
    // crypto.pbkdf2Sync('password123', 'salt', 100000, 1024, 'sha512')
    // console.log(Date.now() - start, "password encrypted in event loop")

    // crypto functions passed into thread pool (default 4)
    crypto.pbkdf2('password123', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "password encrypted in thread pool")
    });
    crypto.pbkdf2('password123', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "password encrypted in thread pool")
    });
    crypto.pbkdf2('password123', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "password encrypted in thread pool")
    });
    crypto.pbkdf2('password123', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "password encrypted in thread pool")
    });

});

console.log('Top Level Code');