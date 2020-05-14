const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// Mongoose Schema
var connectionSchema = new mongoose.Schema({
    connectionID: {
        type: Number,
    },
    itemName: {
        type: String,
        required: true
    },
    typeOfFood: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    locations: {
        type: String,
        required: true
    }
}, 
{ collection: 'connections' });

connectionSchema.plugin(AutoIncrement, {inc_field: 'connectionID'});


var Connection = mongoose.model('connections', connectionSchema);

module.exports = Connection;

// Connection Class 
// class Connection {
//     _connectionID = {
//         type: String,
//         value: null,
//         required: true,
//         unique: true
//     };
//     _itemName = {
//         type: String,
//         value: null,
//         required: true
//     };
//     _typeOfFood = {
//         type: String,
//         value: null,
//         required: true
//     };
//     _details = {
//         type: String,
//         value: null
//     };

//     _cookingTime = {
//         type: String,
//         value: null,
//         required: true
//     };
//     _imageurl = {
//         type: String,
//         value: null
//     };
//     _locations = {
//         type: String,
//         value: null
//     };
//     // getter and setter methods for each detail
//     get connectionID () {
//         return this._connectionID;
//     }
//     set connectionID(value) {
//         this._connectionID = value;
//     }
//     get itemName () {
//         return this._itemName;
//     }
//     set itemName(value) {
//         this._itemName = value;
//     }
//     get typeOfFood () {
//         return this._typeOfFood;
//     }
//     set typeOfFood(value) {
//         this._typeOfFood = value;
//     }
//     get details () {
//         return this._details;
//     }
//     set details(value) {
//         this._details = value;
//     }
//     get locations () {
//         return this._locations;
//     }
//     set locations(value) {
//         this._locations = value;
//     }
//     get cookingTime () {
//         return this._cookingTime;
//     }
//     set cookingTime(value) {
//         this._cookingTime = value;
//     }
//     get imageUrl () {
//         return this._imageUrl;
//     }
//     set imageUrl(value) {
//         this._imageUrl = value;
//     }
// }

// module.exports = Connection;