const permissionsDAL = require('../DALs/permissionsFileDAL');

const addUser = async id => {
    const permissions = await permissionsDAL.getPermissions()
    let user = {};
    user._id = id;
    user.permissions = [
        { name: "View Subscriptions", checked: true },
        { name: "Create Subscriptions", checked: false },
        { name: "Update Subscriptions", checked: false },
        { name: "Delete Subscriptions", checked: false },
        { name: "View Movies", checked: true },
        { name: "Create Movies", checked: false },
        { name: "Update Movies", checked: false },
        { name: "Delete Movies", checked: false }
    ]
    permissions.permissions.push(user)
    const status = await permissionsDAL.savePermissions(permissions);
    return status;
}

const getUser = async id => {
    const permissions = {
        viewSub: false, 
        createSub: false, 
        editSub: false, 
        deleteSub: false,
        viewMovies: false,
        createMovies: false,
        editMovies: false,
        deleteMovies: false
    }
    const data = await permissionsDAL.getPermissions()
    let user = data.permissions.find(perm => perm._id == id)
    user.permissions[0].checked && (permissions.viewSub = true)
    user.permissions[1].checked && (permissions.createSub = true)
    user.permissions[2].checked && (permissions.editSub = true)
    user.permissions[3].checked && (permissions.deleteSub = true)
    user.permissions[4].checked && (permissions.viewMovies = true)
    user.permissions[5].checked && (permissions.createMovies = true)
    user.permissions[6].checked && (permissions.editMovies = true)
    user.permissions[7].checked && (permissions.deleteMovies = true)

    return permissions;
}

const editUser = async (obj, id) => {
    const data = await permissionsDAL.getPermissions()
    let user = data.permissions.find(perm => perm._id == id)
    let index = data.permissions.indexOf(user);
    user.permissions = obj.permissions
    data.permissions.splice(index, 1, user)
    const status = await permissionsDAL.savePermissions(data);
    return status;
}

const createUser = async (obj, id) => {
    const data = await permissionsDAL.getPermissions()
    const user = {}
    user._id = id
    user.permissions = obj.permissions;
    data.permissions.push(user)
    const status = await permissionsDAL.savePermissions(data);
    return status;
};

const deleteUser = async id => {
    const data = await permissionsDAL.getPermissions()
    let user = data.permissions.find(perm => perm._id == id)
    let index = data.permissions.indexOf(user);
    data.permissions.splice(index, 1)
    const status = await permissionsDAL.savePermissions(data);
    return status;
}


module.exports = { addUser, getUser, editUser, createUser, deleteUser }





