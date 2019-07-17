const fs = require('fs');
/*
// Blocking -> synchronous way
const avacato = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(avacato);

const textOutput = `${avacato} Avocado is also a popular choice for smoothies!\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/textOutput.txt', textOutput);
console.log('file written!');
*/

// Non-Blocking -> asynchronous way
fs.readFile('txt/start.txt', 'utf-8', (error, data1) => {
    if (error) console.log(error);
    fs.readFile(`txt/${data1}.txt`, 'utf-8', (error, data2) => {
        if (error) console.log(error);
        console.log(data2);
        fs.readFile(`txt/append.txt`, 'utf-8', (error, data3) => {
            if (error) console.log(error);
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}` ,'utf-8', (error) => {
                if (error) console.log(error);
                console.log('final file has been written :-)')
            })
        });
    });
});
console.log('will read file');