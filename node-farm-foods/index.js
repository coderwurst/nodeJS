const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

///////////////////////////////////
// SERVER
///////////////////////////////////
// top level code - only executed once, when server starts (here sync is not a bad thing)
// load templates
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
// load data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// exe each time a new request is sent
const server = http.createServer((request, response) => {
    const { query, pathname } = url.parse(request.url, true);

    // overview page
    if (pathname === '/' || pathname === '/overview') {
        // send template as html
        response.writeHead(200, { 'Content-type': 'text/html' });

        // load data from json into cards, as string - replacing placeholders
        const cardsHTML = dataObject.map(currentElement => replaceTemplate(templateCard, currentElement)).join('');

        // place cards html into overview html
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        response.end(output);

    // product page
    } else if (pathname === '/product') {
        response.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObject[query.id];
        const output = replaceTemplate(templateProduct, product);
        response.end(output);

    // api
    } else if (pathname === '/api') {
        response.writeHead(200, { 'Content-type': 'text/json' });
        response.end(data);

    // not found
    } else {
        response.writeHead(404, {
            'Content-type': 'text/html'
        });
        response.end('<h1>404: Page not found :-(</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server online_');
});