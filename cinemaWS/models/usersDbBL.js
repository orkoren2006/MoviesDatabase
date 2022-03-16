const usersModel = require('./usersModel');

const createDB = () => {
    return new Promise((resolve, reject) => {
        let user = new usersModel({
            username: "orko",
            password: "orko83"
        })
        user.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve("created")
            }
        })
    })
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        usersModel.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const getUser = id => {
    return new Promise((resolve, reject) => {
        usersModel.findById(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const getLastUser = () => {
    return new Promise((resolve, reject) => {
        let user = usersModel.find().sort({ _id: -1 }).limit(1)
        if (!user) {
            reject("no user found")
        } else { 
            resolve(user) 
        }
    })
};

const addUser = obj => { //this one is when a user creates its own user from create account page with a chosen password
    return new Promise((resolve, reject) => {
        let user = new usersModel({
            username: obj.username,
            password: obj.password
        })
        user.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve("user created on mongoDb")
            }
        })
    })
};

const createUser = obj => { //this one is when an admin creates a user without inserting a pssword. The password is default.
    return new Promise((resolve, reject) => {
        let user = new usersModel({
            username: obj.username,
            password: "temp123"
        })
        user.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve("user created on mongoDb")
            }
        })
    })
};

const updateUser = (obj, id) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndUpdate(id, {
            username: obj.username,
            password: obj.password
        }, err => {
            if (err) {
                reject(err)
            } else {
                resolve("user updated")
            }
        })

    })
};

const deleteUser = id => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndDelete(id, err => {
            if (err) {
                reject(err)
            } else {
                resolve("user deleted")
            }
        })
    })
};





module.exports = { createDB, getUsers, getUser, getLastUser, addUser, createUser, updateUser, deleteUser };

