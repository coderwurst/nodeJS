const EventEmitter = require('events');

class Sales extends EventEmitter{
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
   console.log("myEmitter -> newSale callback 1");
});

myEmitter.on("newCustomer", () => {
    console.log("myEmitter -> newCustomer callback");
});

myEmitter.on("newOrder", () => {
    console.log("myEmitter -> newOrder callback");
});

myEmitter.on("newSale", (stock) => {
    console.log(`myEmitter -> there are ${ stock } items left`);
});

myEmitter.emit("newSale");
myEmitter.emit("newCustomer");
myEmitter.emit("newCustomer");
myEmitter.emit("newOrder");
myEmitter.emit("newSale", 9);
