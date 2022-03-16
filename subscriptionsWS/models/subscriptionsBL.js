
const SubscriptionsModel = require('./subscriptionsModel');

const getSubscriptions = () => {
    return new Promise((resolve, reject) => {
        SubscriptionsModel.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const getSubscription = id => {
    return new Promise((resolve, reject) => {
        SubscriptionsModel.findById(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const createSubscription = obj => {
    return new Promise((resolve, reject) => {
        let sub = new SubscriptionsModel({
            member_id: obj.member_id,
            movies: obj.movies
        });

        sub.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve('subscription created!')
            }
        })
    })
};

const updateSubscription = (id,obj) => {
    return new Promise((resolve,reject) => {
        SubscriptionsModel.findByIdAndUpdate(id, {
            member_id: obj.member_id,
            movies: obj.movies
        }, err => {
            if(err) {
                reject(err)
            }else {
                resolve('subscription updated!')
            }
        })
    })
};

const deleteSubscription = id => {
    return new Promise((resolve, reject) => {
        SubscriptionsModel.findByIdAndDelete(id, err=> {
            if(err) {
                reject(err)
            }else {
                resolve('subscription deleted')
            }
        })
    })
};

module.exports = { getSubscriptions, getSubscription, createSubscription, updateSubscription, deleteSubscription }

