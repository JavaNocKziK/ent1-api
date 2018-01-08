const Film = require('../models/film');
const FilmLib = require('../public/libs/film');

module.exports = {
    films: {
        /**
         * Add new film.
         */
        add: (params) => {
            return new Promise((accept, reject) => {
                let contentType = `application/json`;
                let contentData = ``;
                let film = new Film();
                film.title = (params.title === undefined ? '' : params.title);
                film.year = (params.year === undefined ? '' : params.year);
                film.director = (params.director === undefined ? '' : params.director);
                film.cast = (params.cast === undefined ? '' : params.cast);
                film.review = (params.review === undefined ? '' : params.review);
                film.save((err) => {
                    if(err) {
                        reject({
                            contentType: contentType,
                            contentData: ({ error: 'Error adding new film.' })
                        });
                    } else {
                        accept({
                            contentType: contentType,
                            contentData: {
                                message: `Generated new film successfully.`,
                                data: params
                            }
                        });
                    }
                });
            });
        },
        /**
         * List all films.
         */
        list: (options, params) => {
            return new Promise((accept, reject) => {
                let contentType = `text/plain`;
                let contentData = ``;
                let exception = undefined;
                let query = Film.find();
                console.log(params);
                if(params.title) {
                    query.where('title').regex(new RegExp(params.title, 'gi'));
                }
                if(params.year) {
                    query.where('year').equals(params.year);
                }
                query.exec((err, data) => {
                    if(err) {
                        exception = { error: `Database error.` };
                    } else {
                        switch(options.format) {
                            case `tab`:
                                contentType = `text/plain`;
                                contentData = FilmLib.toTab(JSON.stringify(data));
                                break;
                            case `csv`:
                                contentType = `text/csv`;
                                contentData = FilmLib.toCsv(JSON.stringify(data));
                                break;
                            case `xml`:
                                contentType = `application/xml`;
                                contentData = FilmLib.toXml(JSON.stringify(data));
                                break;
                            case null:
                            case undefined:
                            case '':
                            case `json`:
                                contentType = `application/json`;
                                contentData = data;
                                break;
                            default:
                                exception = { error: `Unknown format.` };
                                break;
                        }
                    }
                    if(exception) {
                        reject({
                            contentType: contentType,
                            contentData: exception
                        });
                    } else {
                        accept({
                            contentType: contentType,
                            contentData: contentData
                        });
                    }
                });
            });
        },
        /**
         * Returns film data in a specific format as a string.
         */
        get: (id, options) => {
            return new Promise((accept, reject) => {
                Film.findById(id, (err, data) => {
                    let contentType = `text/plain`;
                    let contentData = ``;
                    let exception = undefined;
                    if(err) {
                        exception = { error: `Database error.` };
                    } else {
                        switch(options.format) {
                            case `tab`:
                                contentType = `text/plain`;
                                contentData = FilmLib.toTab(JSON.stringify(data));
                                break;
                            case `csv`:
                                contentType = `text/csv`;
                                contentData = FilmLib.toCsv(JSON.stringify(data));
                                break;
                            case `xml`:
                                contentType = `application/xml`;
                                contentData = FilmLib.toXml(JSON.stringify(data));
                                break;
                            case null:
                            case undefined:
                            case ``:
                            case `json`:
                                contentType = `application/json`;
                                contentData = data;
                                break;
                            default:
                                exception = { error: `Unknown format.` };
                                break;
                        }
                    }
                    if(exception) {
                        reject({
                            contentType: contentType,
                            contentData: exception
                        });
                    } else {
                        accept({
                            contentType: contentType,
                            contentData: contentData
                        });
                    }
                });
            });
        },
        /**
         * Update a specfic film with new data.
         */
        update: (id, params) => {
            return new Promise((accept, reject) => {
                Film.findById(id, (err, data) => {
                    let contentType = `application/json`;
                    if(err) {
                        reject({
                            contentType: contentType,
                            contentData: { error: `Error finding film to update.` }
                        });
                    } else {
                        if(params.title !== undefined)
                            data.title = params.title;
                        if(params.year !== undefined)
                            data.year = params.year;
                        if(params.director !== undefined)
                            data.director = params.director;
                        if(params.cast !== undefined)
                            data.cast = params.cast;
                        if(params.review !== undefined)
                            data.review = params.review;
                        data.save((err) => {
                            if(err) {
                                reject({
                                    contentType: contentType,
                                    contentData: { error: `Error updating film.` }
                                });
                            } else {
                                accept({
                                    contentType: contentType,
                                    contentData: { success: 'Film data updated.' }
                                });
                            }
                        });
                    }
                });
            });
        },
        /**
         * Delete a specific film.
         */
        delete: (id) => {
            return new Promise((accept, reject) => {
                Film.remove(
                    {
                        _id: id
                    },
                (err, film) => {
                    let contentType = `application/json`;
                    if(err) {
                        reject({
                            contentType: contentType,
                            contentData: { error: `Error deleting film.` }
                        });
                    } else {
                        accept({
                            contentType: contentType,
                            contentData: { success: 'Film deleted.' }
                        });
                    }
                });
            });
        }
    }
}