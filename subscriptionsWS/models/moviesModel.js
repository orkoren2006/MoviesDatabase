const mongoose = require('mongoose');

let ImageSchema = new mongoose.Schema({
    medium: String,
    original: String
});

let MovieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    image: ImageSchema,
    date: String
});



module.exports = mongoose.model('movies', MovieSchema);

