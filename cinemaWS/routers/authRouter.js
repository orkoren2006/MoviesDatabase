const express = require('express');
const jwt = require('jsonwebtoken');
const dataBL = require('../models/dataBL');
const usersBL = require('../models/usersDbBL')
const usersFileBL = require('../models/usersFileBL')
const permissionsBL = require('../models/permissionsFileBL')
const router = express.Router();


router.route('/login')
    .post(async function (req, resp) {
        let data = req.body;
        let users = await usersBL.getUsers()
        let user = users.find(x => x.username == data.username && x.password == data.password)
        if (user) {
            const userId = user._id;
            const userFromFile = await usersFileBL.getUser(userId)
            const firstName = userFromFile["First Name"];
            const role = userFromFile["Role"]
            const sessionTimeOut = userFromFile.SessionTimeOut*60
            const userPerm = await permissionsBL.getUser(userId);

            const usersFromAll = await dataBL.usersData(users)

            const RSA_PRIVATE_KEY = 'somekey';

            var tokenData = jwt.sign({ id: userId },
                RSA_PRIVATE_KEY,
                { expiresIn: sessionTimeOut } 
            );
            resp.status(200).send({ token: tokenData, userId: userId, name: firstName, role: role, users: usersFromAll, user: userPerm});
        }
        else {
            // resp.sendStatus(401) //if I use this line the condition doesn't fulfill at either stage in the frontend
            resp.json("Wrong username or password")
        }
    });

router.route('/signup')
.post(async function (req, resp)
{
    let users = await usersBL.getUsers()
    let user = users.filter(x => x.username == req.body.username)
    console.log(user);
    if(user.length == 0) {
        await usersBL.addUser(req.body);
        const userfromMongo = await usersBL.getLastUser();
        const _id = userfromMongo[0]._id
        await usersFileBL.addUser(req.body, _id);
        await permissionsBL.addUser(_id)

        //create Token
        const RSA_PRIVATE_KEY = 'somekey';
        var tokenData = jwt.sign({id: _id},
            RSA_PRIVATE_KEY,
            {expiresIn: 7200}
            );
            resp.status(200).send({token: tokenData, userId: _id, message: "user successfully created"})
    } else {
        resp.json("username already exists!")
    }
})


module.exports = router;