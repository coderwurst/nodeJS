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

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if (error) reject(error.message);
            resolve('image saved to file');
        });
    });
}

readFilePro(`${__dirname}/dog.txt`).then( data => {
        console.log('Breed: ' + data);
        return superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(response => {
        console.log(response.body.message);
        return writeFilePro('dog-img.txt', response.body.message)
    })
    .then((message) => {
        console.log(message);
    })
    .catch(error => {
        console.log(error.message);
    });
