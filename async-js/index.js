const fs = require('fs');
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
    if (error) return console.log(error.message);
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
