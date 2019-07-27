// not cached, only called on 1st require
console.log("Hello from the module");

// called each time required from cache
module.exports = () => {
    console.log('Hello from test-module-3, module.exports');
}