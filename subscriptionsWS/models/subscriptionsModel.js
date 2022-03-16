const mongoose = require('mongoose');

let MoviesSchema = new mongoose.Schema({
    date: String,
    title: String,
    movie_id: String
});


let SubscriptionSchema = new mongoose.Schema({
    member_id: String,
    movies: [MoviesSchema]
});



module.exports = mongoose.model('subscriptions', SubscriptionSchema)