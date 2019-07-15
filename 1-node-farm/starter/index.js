const fs = require('fs');

const avacato = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(avacato);

const textOutput = `${avacato} Avocado is also a popular choice for smoothies!\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/textOutput.txt', textOutput);
console.log('file written!');
