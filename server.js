const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const filmroutes = require('./app/routes/films');

const app = express();
const port = process.env.PORT || 8200;

mongoose.connect('mongodb://ent1admin:67YraCgjvE7u4gE6@ds135817.mlab.com:35817/uni3-ent1');

const CORS = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
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

app.listen(port);
console.log(`Magic happens on port ${port}`);