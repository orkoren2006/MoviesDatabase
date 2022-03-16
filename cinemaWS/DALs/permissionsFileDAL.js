const jFile = require('jsonfile');

const getPermissions = () => {
    return new Promise((resolve,reject) => {
        jFile.readFile(__dirname + '/permissions.json', function(err,data){
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
};

const savePermissions = obj => {
    return new Promise((resolve,reject) => {
        jFile.writeFile(__dirname + '/permissions.json', obj, { spaces: 2 }, function(err) {
            if(err) {
                reject(err)
            }else {
                resolve("File updated!")
            }
        })
    })
}

module.exports = {getPermissions, savePermissions}