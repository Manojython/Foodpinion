const mongoose = require('mongoose');
const connectionDB = require('./connectionDB');
const UserConnection = require('./../models/UserConnection');
const User = require('./../models/User');

let self = {};


self.findUser = (userName, cb) => {
    User.find({ 'email': userName }, (err, result) => {
        if (err) {
            console.error(err);
            cb(null);
        } else cb(result);
    });
}

module.exports = self;