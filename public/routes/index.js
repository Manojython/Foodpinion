var express = require('express');
var router = express.Router();
var utility = require('../util/connectionDB');
var bodyParser = require('body-parser');
const userProfile = require('./../util/userProfile');
// var userActivity = require('../util/userProfile');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// validator
var { check, validationResult } = require('express-validator');

const loginRequired = (req, res, next) => {
    if (req.session.userProfile) next();
    else res.redirect('/user/login'); // reroute to login page if the user has not logged in
}


// route for home
router.get('/', function(req, res) {
    res.render('pages/index', { user: req.session.userProfile, errors: null })
});

// about page
router.get('/about', function(req, res) {
    res.render('pages/about', { user: req.session.userProfile, errors: null })
});

// contact page
router.get('/contact', function(req, res) {
    res.render('pages/contact', { user: req.session.userProfile, errors: null })
});


// router.get('/connections', function(req, res) {
//     res.render('pages/connections')
// })


// Saved Connections or MyConnections
router.get('/savedConnections', function(req, res) {

    console.log("session: ", req.session);

    userProfile.getUserConnections(req.session.userProfile._id, result => {

        res.render('pages/savedConnections', { userConnections: result, user: req.session.userProfile, errors: null })
    });
});

// new Connection
router.get('/newConnection', loginRequired, function(req, res) {
    res.render('pages/newConnection', { user: req.session.userProfile, errors: null })
});

// Connections category what's this?
router.get('/connections', function(req, res) {

    var foodCat = [];
    // console.log("/connections", "came here");
    utility.getConnections(food => {
        // console.log("food: ", food);
        for (var i = 0; i < food.length; i++) {
            foodCat.push(food[i].typeOfFood)
        }
        var Category = foodCat.filter((cat, ind, item) => item.indexOf(cat) === ind);
        // console.log(Category);
        res.render('pages/connections', { querystring: food, unique: Category, user: req.session.userProfile, errors: null });
    });

});

// Individual connection page
router.get('/connection', function(req, res) {
    var ID = req.query.ID;
    utility.getConnection(ID, food => {
        // var response = [];
        // response.push(food);

        // console.log(response);
        res.render('pages/connection', { querystring: food, user: req.session.userProfile, errors: null })
    });
});


// Login Page:
router.get('/user/login', function(req, res) {

    res.render('pages/login', { user: req.session.userProfile, errors: null });
});
//


// new incoming Connection

router.post('/additem', urlencodedParser, loginRequired, [
    check('typeoffood')
    .isLength({ min: 4 })
    .trim()
    .escape()
    .withMessage("Enter type of food atleast with 4 Characters."),
    check('item')
    .isLength({ min: 4 })
    .trim()
    .escape()
    .withMessage("Enter food item with atleast 4 Characters."),
    check('details')
    .isLength({ min: 10 })
    .trim()
    .escape()
    .withMessage("Description of Food should be atleast 10 Characters."),
    check('locations')
    .isLength({ min: 4 })
    .trim()
    .escape()
    .withMessage("Location should be atleast 4 letters."),
    check('time')
    .isLength({ min: 3 })
    .withMessage("Please Enter Time as example: 2am or 3pm ")
], function(req, res) {
    console.log("===================\n", req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/newConnection.ejs', {
            user: req.session.userProfile,
            errors: errors.array()
        });
    }
    utility.saveConnection(req.body, (result) => {
        if (result == null) {
            console.log("Unable to save connection : ", req.body);
        }

        // console.log("result: ", result);

        userProfile.addConnectionById(
            req.session.userProfile._id,
            result.connectionID,
            'yes',
            (result_2) => {
                res.redirect('/savedConnections'); // redirecting to my connections
            });
    });

});



module.exports = router;