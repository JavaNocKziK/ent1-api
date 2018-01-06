const express = require('express');
const xmljs = require('xml-js');

const router = express.Router();
const Film = require('../models/film');
const FilmLib = require('../public/libs/film');

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
    .post((req, res) => {
        let film = new Film();
        film.title = req.body.title;
        film.year = req.body.year;
        film.director = req.body.director;
        film.cast = req.body.cast;
        film.review = req.body.review;
        film.save((err) => {
            if(!error(res, err)) {
                res.json({
                    message: `Generated new film successfully.`,
                    data: req.body
                });
            }
        });
    })
    .get((req, res) => {
        Film.find((err, films) => {
            if(!error(res, err)) {
                let format = req.query.format;
                switch(format) {
                    case `tab`:
                        res.set('Content-Type', 'text/plain');
                        res.send(FilmLib.toTab(JSON.stringify(films)));
                        break;
                    case `csv`:
                        res.set('Content-Type', 'text/csv');
                        res.send(FilmLib.toCsv(JSON.stringify(films)));
                        break;
                    case `xml`:
                        res.set('Content-Type', 'application/xml');
                        res.send(FilmLib.toXml(JSON.stringify(films)));
                        break;
                    case null:
                    case undefined:
                    case '':
                    case `json`:
                        res.json(films);
                        break;
                    default:
                        res.json({ error: 'Unknown format.' });
                        break;
                }
            }
        });
    });

/**
 * All operations for /films/:id
 */
router.route('/:id')
    .get((req, res) => {
        Film.findById(req.params.id, (err, film) => {
            if(!error(res, err)) {
                res.json(film);
            }
        });
    })
    .put((req, res) => {
        Film.findById(req.params.id, (err, film) => {
            if(!error(res, err)) {
                film.name = req.body.name;
                film.save((err) => {
                    if(!error(res, err)) {
                        res.json({ message: 'Film updated!' });
                    }
                });
            }
        });
    })
    .delete((req, res) => {
        Film.remove({
            _id: req.params.id
        }, (err, film) => {
            if(!error(res, err)) {
                res.json({ message: 'Successfully deleted' });
            }
        });
    });


/**
 * Export routes.
 */
module.exports = router;