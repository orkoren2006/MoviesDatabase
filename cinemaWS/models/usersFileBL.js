const usersDAL = require('../DALs/usersFileDAL');


const addUser = async (obj,id) => {
    const users = await usersDAL.getUsers()
    let user = {};
    user._id = id;
    user["First Name"] = obj.firstName
    user["Last Name"] = obj.lastName
    user["Created Date"] = new Date() //change later to a more readable format
    user["SessionTimeOut"] = 60
    user["Role"] = "Viewer"
    users.users.push(user)
    const status = await usersDAL.saveUser(users);
    return status;
};

const getUser = async id => {
    const users = await usersDAL.getUsers()
    const user = users.users.find(x => x._id == id)
    return user
}

const editUser = async (obj,id) => {
    const data = await usersDAL.getUsers()
    const user = data.users.find(x => x._id == id);
    const index = data.users.indexOf(user)
    user["First Name"] = obj.firstName
    user["Last Name"] = obj.lastName
    user["SessionTimeOut"] = obj.SessionTimeOut
    data.users.splice(index,1,user)
    const status = await usersDAL.saveUser(data);
    return status;
}

const createUser = async (obj,id) => {
    const data = await usersDAL.getUsers()
    const user = {}
    user._id = id
    user["First Name"] = obj.firstName
    user["Last Name"] = obj.lastName
    user["Created Date"] = new Date()
    user["SessionTimeOut"] = obj.SessionTimeOut
    user["Role"] = "Viewer"
    data.users.push(user)
    const status = await usersDAL.saveUser(data)
    return status;

}

const deleteUser = async id => {
    const data = await usersDAL.getUsers()
    const user = data.users.find(x => x._id == id);
    const index = data.users.indexOf(user)
    data.users.splice(index,1)
    const status = await usersDAL.saveUser(data);
    return status;
}

module.exports = {addUser, getUser, editUser, createUser, deleteUser}




