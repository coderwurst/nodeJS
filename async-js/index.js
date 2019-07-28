const fs = require('fs');
const superagent = require('superagent')

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (error, data) => {
            if (error) reject(error.message);       // available later in the catch method
            resolve(data);                          // available later in then method
        });
    });
}

readFilePro(`${__dirname}/dog.txt`).then( data => {
    console.log('Breed: ' + data);
    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(response => {
        console.log(response.body.message);
        fs.writeFile('dog-img.txt', response.body.message, (error) => {
            if (error) return console.log(error.message);
            console.log('image saved to file');
        });
    }).catch(error => {
        if (error) return console.log(error.message);
    });
});
