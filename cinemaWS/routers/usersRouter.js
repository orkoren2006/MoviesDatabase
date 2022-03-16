const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersDbBL = require('../models/usersDbBL');
const permissionsBL = require('../models/permissionsFileBL')
const usersFileBL = require('../models/usersFileBL')
const dataBL = require('../models/dataBL');


//get all users without JWT
router.route('/')
.get(async function(req,resp)
{
    let users = await usersDbBL.getUsers()
    const usersFromAll = await dataBL.usersData(users)
    resp.status(200).send(usersFromAll)

});

//get a user
router.route('/:id')
    .get(async function (req, resp) {
        let id = req.params.id
        let user = await usersDbBL.getUser(id);
        return resp.json(user)
    });


//create new user
router.route('/')
    .post(async function (req, resp) {
        await usersDbBL.createUser(req.body);
        const userfromMongo = await usersDbBL.getLastUser();
        const _id = userfromMongo[0]._id
        await permissionsBL.createUser(req.body, _id)
        await usersFileBL.createUser(req.body, _id)
        return resp.json("user created");

    });

//edit a user without jwt
router.route('/:id')
    .put(async function (req, resp) {
        let id = req.params.id;
        await usersDbBL.updateUser(req.body, id) 
        await permissionsBL.editUser(req.body, id)
        await usersFileBL.editUser(req.body, id)
        // return resp.json(status);
        return resp.json("cool man");
    }
    );


//delete a user
router.route('/:id')
    .delete(async function (req, resp) {
        let id = req.params.id;
        await usersDbBL.deleteUser(id);
        await permissionsBL.deleteUser(id)
        await usersFileBL.deleteUser(id)
        return resp.json('user deleted');
    });



module.exports = router;