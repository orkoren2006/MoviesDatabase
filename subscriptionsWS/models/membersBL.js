const DAL = require('../DALs/wsDAL');
const MemberModel = require('./membersModel');

const getMembersFromWS = async () => {
    let resp = await DAL.getMembers();
    let members = []
    resp.data.forEach(member => {
        let obj = {}
        obj.name = member.name;
        obj.email = member.email;
        obj.city = member.address.city;
        members.push(obj)
    })

    _createMembers(members);

};


const _createMembers = members => {
    members.forEach(item => {
        return new Promise((resolve, reject) => {
            let member = new MemberModel({
                name: item.name,
                email: item.email,
                city: item.city
            });

            member.save(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve('created')
                }
            })
        })
    })
};

const getMembers = () => {
    return new Promise((resolve, reject) => {
        MemberModel.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
};

const getMember = id => {
    return new Promise((resolve, reject) => {
        MemberModel.findById(id, function(err, data) {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};


const createMember = obj => {
    return new Promise((resolve, reject) => {
        let member = new MemberModel({
            name: obj.name,
            email: obj.email,
            city: obj.city
        });

        member.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve('member created')
            }
        })
    })
};


const updateMember = (id,obj) => {
    return new Promise((resolve, reject) => {
        MemberModel.findByIdAndUpdate(id,  {
            name: obj.name,
            email: obj.email,
            city: obj.city
        }, err => {
            if(err) {
                reject(err)
            } else {
                resolve('updated')
            }
        }
    )})
};


const deleteMember = id => {
    return new Promise((resolve, reject)=> {
        MemberModel.findByIdAndDelete(id, function(err) {
            if(err) {
                reject(err)
            } else {
                resolve('deleted')
            }
        })
    })
};


module.exports = { getMembersFromWS ,createMember, getMembers, updateMember, getMember, deleteMember };

