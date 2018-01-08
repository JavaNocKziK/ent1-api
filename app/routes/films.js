const express = require('express');
const xmljs = require('xml-js');

const router = express.Router();
const Film = require('../models/film');
const FilmLib = require('../public/libs/film');
const Mdb = require('../controllers/mongodb');

let error = (res, msg) => {
    if(msg) {
        console.error(msg);
        res.send(msg);
        return true;
    }
    return false;
}

/**
 * All operations for /films
 */
router.route('/')
    .get((req, res) => {
        Mdb.films.list({
            // Options.
            format: req.query.format
        },{
            // Search parameters.
            title: req.query.title
        }).then((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        }).catch((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        });
    })
    .post((req, res) => {
        Mdb.films.add(req.body)
        .then((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        }).catch((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        });
    });

/**
 * All operations for /films/:id
 */
router.route('/:id')
    .get((req, res) => {
        Mdb.films.get(req.params.id, {
            // Options.
            format: req.query.format
        }).then((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        }).catch((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        });
    })
    .put((req, res) => {
        Mdb.films.update(req.params.id, {
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            cast: req.body.cast,
            review: req.body.review
        }).then((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        }).catch((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        });
    })
    .delete((req, res) => {
        Mdb.films.delete(req.params.id)
        .then((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        }).catch((data) => {
            res.set('Content-Type', data.contentType);
            res.send(data.contentData);
        });
    });


/**
 * Export routes.
 */
module.exports = router;