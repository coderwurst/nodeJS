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
/*
// then - catch to chain promises
readFilePro(`${__dirname}/dog.txt`).then( data => {
        console.log('Breed: ' + data);
        return superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(resolve => {
        console.log(resolve.body.message);
        return writeFilePro('dog-img.txt', resolve.body.message)
    })
    .then((message) => {
        console.log(message);
    })
    .catch(error => {
        console.log(error.message);
    });
*/

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);     // code stops until this call has returned
        console.log('2. breed: ' + data);
        const resolve = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(resolve.body.message);
        const writeResolve = await writeFilePro('dog-img.txt', resolve.body.message);
        console.log(writeResolve);
    } catch (error) {
        console.log(error.message);         // here the promise is still fufilled
        throw(error);                       // marks promise as rejected, to be caught in surrounding catch block
    }
    return '3. return value for x';
};

// async function to retrieve value from promise
(async () => {
    try {
        console.log('1. getDocPic');
        const x = await getDogPic();
        console.log(x);
    } catch (error) {
        console.log(error);
    }
})();

/*
// then - catch to retrieve value from promise
console.log('1. getDocPic');
getDogPic().then(x => {
    console.log(x);
})
.catch(error => {
    console.log(error);
});
*/

