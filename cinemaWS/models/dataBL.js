const usersDB = require('./usersDbBL');
const usersDAL = require('../DALs/usersFileDAL');
const permissionsDAL = require('../DALs/permissionsFileDAL');



const usersData = async users => {
    const usersFromAll = []
    const usersFromFile = await usersDAL.getUsers();
    const permissionsFromFile = await permissionsDAL.getPermissions();
    users.forEach(user => {
        let newUser = {}
        newUser.id = user._id
        newUser.username = user.username
        usersFromFile.users.forEach(x => {
            if (x._id == user._id) {
                newUser.firstName = x["First Name"]
                newUser.lastName = x["Last Name"]
                newUser.SessionTimeOut = x.SessionTimeOut //fix to lowercase "S"
                newUser.createdAt = x["Created Date"]

            }
        })
        permissionsFromFile.permissions.forEach(y => {
            if (y._id == user._id) {
                newUser.permissions = y.permissions
            }
        })

        usersFromAll.push(newUser);
    });

    return usersFromAll;

}


// const authUser = async obj => {
//     let users = await usersDB.getUsers();

//     let resp = users.filter(x => x.username == obj.username && x.password == obj.password);
//     if(resp.length == 0) {
//         return false
//     }else {
//         return resp[0]._id
//     }
// };


module.exports = { usersData };

