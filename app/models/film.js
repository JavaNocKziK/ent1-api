const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let FilmSchema = new Schema(
    {
        title: String,
        year: Number,
        director: String,
        cast: String,
        review: String
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Film', FilmSchema);