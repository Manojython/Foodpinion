var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var router = express.Router();
var session = require('express-session');
// const userProfile = require("../util/userProfile");
const User = require("../models/User");
const userProfile = require('./../util/userProfile');
const userDb = require('./../util/userDB');
// validator
var { check, validationResult } = require('express-validator');

var urlencodedParser = bodyParser.urlencoded({ extended: false });



// check if logged in else redirect to login
const loginRequired = (req, res, next) => {
        if (req.session.userProfile) next();
        else res.redirect('/user/login');
    }
    // number of salting rounds
const saltRounds = 10;

// login with default stuff
router.post('/login', urlencodedParser, [
    check('username')
    .isEmail()
    .withMessage("Please enter a valid username, i.e an email id."),
    check('password')
    .isLength({ min: 3 })
    .withMessage("Invalid password length.")
], function(req, res) {
    // To be used for generating a password for the existing user by taking the input
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash("password", salt, function(err, hash) {
    //         console.log('password: ', hash);
    //     });
    // });
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Parameters to display page title
        return res.render('pages/login.ejs', {
            user: req.session.userProfile,
            errors: errors.array()
        });
    }

    let username = req.body['username'];
    let password = req.body['password'];

    userDb.findUser(username, result => {

        console.log(result);
        if (result == null) {
            return res.render('pages/login.ejs', {
                user: req.session.userProfile,
                errors: [{ msg: "Not a valid Username" }]
            });
        }
        // compare the posted password and the existing password
        bcrypt.compare(
            password,
            result[0].password,
            function(err, compareResult) {
                if (compareResult != true) {
                    return res.render('pages/login.ejs', {
                        user: req.session.userProfile,
                        errors: [{ msg: "Not a valid password." }]
                    });

                } else {

                    //Adding user profile data to session
                    req.session.userProfile = result[0];
                    res.redirect('/connections');
                }
            });
    });
});


// RSVP with the values yes/no/maybe
router.post('/rsvp/:type/:connID', urlencodedParser, loginRequired, [
    check('connID')
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Invalid connection ID"),
    check('type')
    .isIn(['yes', 'no', 'maybe'])
    .withMessage("Invalid RSVP")
], function(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('pages/connections');
    }
    userProfile.addConnectionById(req.session.userProfile._id, req.params['connID'], req.params['type'], result => {
        res.redirect('/savedConnections');
    });
});

// rsvp delete
router.post('/rsvpremove', urlencodedParser, loginRequired, [
    check('connID')
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Invalid connection ID"),
], function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('pages/connections');
    }
    userProfile.removeConnectionById(req.session.userProfile._id, req.body['connID'], result => {
        res.redirect('/savedConnections');
    });
});

// logout functionality by making session of the userProfile as null
router.get('/logout', urlencodedParser, function(req, res) {

    req.session.userProfile = null;
    res.redirect('/');

});

module.exports = router;