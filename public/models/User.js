let mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User;

// class User {
//     _userId = {
//         type: String,
//         value: null,
//         required: true,
//         unique: true
//     };
//     _firstName = {
//         type: String,
//         value: null,
//         required: true
//     };
//     _lastName = {
//         type: String,
//         value: null,
//         required: true
//     };
//     _email = {
//         type: String,
//         value: null
//     };
//     _address1 = {
//         type: String,
//         value: null
//     };
//     _address2 = {
//         type: String,
//         value: null
//     };
//     _city = {
//         type: String,
//         value: null
//     };
//     _state = {
//         type: String,
//         value: null
//     };
//     _zipcode = {
//         type: String,
//         value: null
//     };
//     _country = {
//         type: String,
//         value: null
//     };
//     get userId () {
//         return this._userId.value;
//     }
//     set userId(value) {
//         this._userId.value = value;
//     }
//     get firstName () {
//         return this._firstName.value;
//     }
//     set firstName(value) {
//         this._firstName.value = value;
//     }
//     get lastName () {
//         return this._lastName.value;
//     }
//     set lastName(value) {
//         this._lastName.value = value;
//     }
//     get email () {
//         return this._email.value;
//     }
//     set email(value) {
//         this._email.value = value;
//     }
//     get address1 () {
//         return this._address1.value;
//     }
//     set address1(value) {
//         this._address1.value = value;
//     }
//     get address2 () {
//         return this._address2.value;
//     }
//     set address2(value) {
//         this._address2.value = value;
//     }
//     get city () {
//         return this._city.value;
//     }
//     set city(value) {
//         this._city.value = value;
//     }
//     get state () {
//         return this._state.value;
//     }
//     set state(value) {
//         this._state.value = value;
//     }
//     get zipcode () {
//         return this._zipcode.value;
//     }
//     set zipcode(value) {
//         this._zipcode.value = value;
//     }
//     get country () {
//         return this._country.value;
//     }
//     set country(value) {
//         this._country.value = value;
//     }
// }

// module.exports = User;