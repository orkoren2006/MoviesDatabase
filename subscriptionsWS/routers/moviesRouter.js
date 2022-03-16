const express = require('express');
const moviesBL = require('../models/moviesBL');

const router = express.Router();

// router.route('/')
//     .get(async function (req, resp) {
//         let movies = await moviesBL.getMoviesFromWS(); //need to add a condition that if DB is greater than 0 then dont call the exrernal WS and get users directly from DB
//         return resp.json(movies)
//     })

router.route('/')
    .get(async function (req, resp) {
        let movies = await moviesBL.getMovies(); //need to add a condition that if DB is greater than 0 then dont call the exrernal WS and get users directly from DB
        return resp.json(movies)
    })


router.route('/:id')
    .get(async function (req, resp) {
        let id = req.params.id
        let movie = await moviesBL.getMovie(id);
        return resp.json(movie)
    })

router.route('/') 
.post(async function(req, resp)
{
    let status = await moviesBL.createMovie(req.body);
    return resp.json(status)
})

router.route('/:id')
.put(async function(req,resp)
{
    let id = req.params.id
    let status = await moviesBL.updateMovie(id, req.body);
    return resp.json(status)
});

router.route('/:id')
.delete(async function(req, resp)
{
    let id = req.params.id
    let status = await moviesBL.deleteMovie(id);
    return resp.json(status)
})


module.exports = router;



