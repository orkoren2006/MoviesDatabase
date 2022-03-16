const express = require('express');
const membersBL = require('../models/membersBL')

const router = express.Router();

// router.route('/') //need to add a condition that if DB is greater than 0 then dont call the exrernal WS and get users directly from DB
//     .get(async function(req, resp) 
//     {
//         let status = await membersBL.getMembersFromWS();
//         return resp.json(status)
//     });


router.route('/') //getting the data directly from the DB, this should be a stipulated part of the above function
    .get(async function(req, resp) 
    {
        let members = await membersBL.getMembers();
        return resp.json(members)
    });


router.route('/:id') 
    .get(async function(req, resp) 
    {
        let id = req.params.id
        let members = await membersBL.getMember(id);
        return resp.json(members)
    });


router.route('/')
.post(async function (req, resp)
{
    let status = await membersBL.createMember(req.body)
    return resp.json(status)
});


router.route('/:id')
.put(async function (req, resp)
{
    let id = req.params.id
    let status = await membersBL.updateMember(id, req.body)
    return resp.json(status)
});


router.route('/:id')
.delete(async function (req, resp)
{
    let id = req.params.id
    let status = await membersBL.deleteMember(id)
    return resp.json(status)
});



module.exports = router;



