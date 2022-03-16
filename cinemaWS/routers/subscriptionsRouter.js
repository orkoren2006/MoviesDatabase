const express = require('express');
const jwt = require('jsonwebtoken');
const DAL = require('../DALs/subscriptionsWSDAL');
const router = express.Router();


router.route('/members')
    .get(async function (req, resp) {
        const RSA_PRIVATE_KEY = 'somekey';
        var token = req.headers['x-access-token'];
        if (!token) {
            console.log('phase 1 - no token proivded');
            return resp.status(401).send({ auth: false, message: 'No Token provided' })
        }
        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, data) {
            if (err) {
                console.log('phase 2 - falied to authenticate members');
                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token' })
            } else {
                console.log('phase 3 - success');
                let members = await DAL.getMembers();
                return resp.json(members.data)
            }
        })
    });

router.route('/members')
    .post(async function (req, resp) {
        let status = await DAL.addMember(req.body)
        return resp.json(status.data)
    });

router.route('/members/:id')
    .put(async function (req, resp) {
        const id = req.params.id
        let status = await DAL.updateMember(req.body, id)
        return resp.json(status.data)
    });

router.route('/members/:id')
    .delete(async function (req, resp) {
        const id = req.params.id
        let status = await DAL.deleteMember(id)
        return resp.json(status.data)
    });

router.route('/movies')
    .get(async function (req, resp) {
        const RSA_PRIVATE_KEY = 'somekey';
        var token = req.headers['x-access-token'];
        if (!token) {
            console.log('phase 1 - no token proivded');
            return resp.status(401).send({ auth: false, message: 'No Token provided' })
        }
        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, data) {
            if (err) {
                console.log('phase 2 - falied to authenticate movies');
                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token' })
            } else {
                console.log('phase 3 - success');
                // res.status(200).send(decoded)
                let movies = await DAL.getMovies();
                return resp.json(movies.data)
            }
        })
    });

router.route('/movies/:id')
    .get(async function (req, resp) {
        const id = req.params.id
        let movie = await DAL.getMovie(id);
        return resp.json(movie.data)
    })

router.route('/movies')
    .post(async function (req, resp) {
        let status = await DAL.addMovie(req.body);
        return resp.json(status.data)
    })

router.route('/movies/:id')
    .put(async function (req, resp) {
        const id = req.params.id
        let status = await DAL.updateMovie(req.body, id)
        return resp.json(status.data)
        // return resp.json(status) //if you do it like this it doesnt work
    });

router.route('/movies/:id')
    .delete(async function (req, resp) {
        const id = req.params.id
        let status = await DAL.deleteMovie(id)
        return resp.json(status.data)
    });

router.route('/subs')
    .post(async function (req, resp) {
        let status = await DAL.addSubscription(req.body);
        return resp.json(status.data);
    });

router.route('/subs')
    .get(async function (req, resp) {
        const RSA_PRIVATE_KEY = 'somekey';
        var token = req.headers['x-access-token'];
        if (!token) {
            console.log('phase 1 - no token proivded');
            return resp.status(401).send({ auth: false, message: 'No Token provided' })
        }
        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, data) {
            if (err) {
                console.log('phase 2 - falied to authenticate subs');
                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token' })
            } else {
                console.log('phase 3 - success');
                // res.status(200).send(decoded)
                let subs = await DAL.getSubscriptions()
                return resp.json(subs.data)
            }
        })
    });

router.route('/subs/:id')
    .put(async function (req, resp) {
        const id = req.params.id
        let status = await DAL.updateSubscription(req.body, id)
        return resp.json(status.data)
    });

router.route('/subs/:id')
    .delete(async function (req, resp) {
        const id = req.params.id
        let status = await DAL.deleteSubscription(id)
        return resp.json(status.data)
    })



module.exports = router;