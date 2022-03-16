const express = require('express');
const subscriptionsBL = require('../models/subscriptionsBL'); 
const router = express.Router();

router.route('/')
.get(async function(req,resp) 
{
    let subs = await subscriptionsBL.getSubscriptions();
    return resp.json(subs);
});


router.route('/:id')
.get(async function(req, resp)
{
    const id = req.params.id
    let sub = await subscriptionsBL.getSubscription(id);
    return resp.json(sub)
});

router.route('/')
.post(async function(req,resp)
{
    let status = await subscriptionsBL.createSubscription(req.body);
    return resp.json(status)
});

router.route('/:id')
.put(async function(req,resp)
{
    const id = req.params.id
    let status = await subscriptionsBL.updateSubscription(id, req.body);
    return resp.json(status)
});

router.route('/:id')
.delete(async function(req,resp)
{
    const id = req.params.id;
    let status = await subscriptionsBL.deleteSubscription(id);
    return resp.json(status);
});

module.exports = router;



