console.log(arguments);

// view wrapper function
// ['(function (exports, require, module, __filename, __dirname) { ',
//    '\n});']
console.log(require('module').wrapper)

// module.exports example
console.log('module.exports example');
const C = require('./test-module-1');
const c1 = new C();
console.log(c1.add(1,2));
console.log(c1.subtract(6,3));
console.log(c1.multiply(2, 2));
console.log(c1.divide(4, 2));

// exports
// exports.add example
console.log('module.exports example');
const c2 = require('./test-module-2');;
console.log(c2.add(1, 2));
console.log(c2.subtract(6, 3));
console.log(c2.multiply(2, 2));
console.log(c2.divide(4, 2));

// destructuring example
console.log('destructuring example');
const { add, subtract, multiply, divide } = require('./test-module-2');;
console.log(add(1, 2));
console.log(subtract(6, 3));
console.log(multiply(2, 2));
console.log(divide(4, 2));


// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
