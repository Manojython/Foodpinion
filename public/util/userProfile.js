const mongoose = require('mongoose');
const connectionDB = require('./connectionDB');
const UserConnection = require('./../models/UserConnection');


let self = {};


self.addConnectionById = (userId, connectionId, rsvp, cb) => {
    UserConnection.findOneAndUpdate({
        user: userId,
        connection: connectionId
    },
    {
        user: userId,
        connection: connectionId,
        rsvp: rsvp
    },
    {
        upsert: true
    },
    (err, result) => {
        if (err) {
            console.error(err);
            cb(null);
        }
        else cb(result);
    });
}

self.removeConnectionById = (userId, connectionId, cb) => {
    
    UserConnection.deleteOne({
        user: userId,
        connection: connectionId
    }, (err, result) => {
        if (err) {
            console.error(err);
            cb(null);
        }
        else cb(result);
    });
}

self.getUserConnections = (userId, cb) => {
    UserConnection
        .aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    "from": "connections",
                    "localField":"connection",
                    "foreignField":"connectionID",
                    "as":"connection"
                }
            }
        ],
        (err, result) => {
            if (err) {
                console.error(err);
                cb(null);
            }
            else cb(result);
        });
}

module.exports = self;