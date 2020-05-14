// Main application file to be run
var express = require('express');
var app = express();
var path = require('path')
var utility = require('../util/connectionDB');
var userController = require('./userController');
var session = require('express-session');

// Session variable:
app.use(session({ secret: 'usersecretsong' }));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/menu2', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Include all the routes that are to be taken
var index = require('../routes/index');
app.use('/', index);
// Include assets: css,images,js
app.use(express.static("../assets"));


// userController
app.use('/user', userController);
app.use('assets', express.static("../assets"));

// set views 
app.set("views", "../views");
app.set('view engine', 'ejs');


// Set port  to 8084
app.listen(8084, function() {
    console.log('app started')
    console.log('listening on port 8084')
});