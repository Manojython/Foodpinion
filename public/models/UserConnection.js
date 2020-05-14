const mongoose = require('mongoose');

var userConnectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    connection: {
        type: Number,
        ref: "connection"
    },
    rsvp: {
        type: String,
        required: true
    }
}, 
{ collection: 'userConnections' });

var UserConnection = mongoose.model('userConnection', userConnectionSchema);

module.exports = UserConnection;


// class UserConnection {
//     _connection = {
//         type: Conn,
//         value: null,
//         required: true,
//         unique: true
//     };
//     _rsvp = {
//         type: String,
//         value: null,
//         required: true
//     };

//     constructor(connection, rsvp) {
//         this._connection.value = connection;
//         this._rsvp.value = rsvp;
//     }

//     get connection() {
//         return this._connection.value;
//     }
//     set connection(value) {
//         this._connection.value = value;
//     }
//     get rsvp() {
//         return this._rsvp.value;
//     }
//     set rsvp(value) {
//         this._rsvp.value = value;
//     }
// }

// module.exports = UserConnection;