const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const filmroutes = require('./app/routes/films');

const app = express();
const port = process.env.PORT || process.argv[2] || 8200;

mongoose.connect('mongodb://ent1admin:67YraCgjvE7u4gE6@ds135817.mlab.com:35817/uni3-ent1');
//mongoose.connect('mongodb://localhost:27017/');

// Load the static Angular files.
app.use(express.static(path.join(__dirname, 'dist')));

// Set CORS to allow all remote addresses to access our API.
const CORS = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

app.use(CORS);

app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.use(bodyParser.json());
app.use('/films', filmroutes);

// Send all requests to our dist.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port);
console.log(`Listening on ${port}...`);