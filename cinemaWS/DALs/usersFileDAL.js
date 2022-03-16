const jFile = require('jsonfile');

const getUsers = () => {
    return new Promise((resolve,reject) => {
        jFile.readFile(__dirname + '/users.json', function(err,data){
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
};

const saveUser = obj => {
    return new Promise((resolve,reject) => {
        jFile.writeFile(__dirname + '/users.json', obj, { spaces: 2 }, function(err) {
            if(err) {
                reject(err)
            }else {
                resolve("File updated!")
            }
        })
    })
}

module.exports = {getUsers, saveUser}