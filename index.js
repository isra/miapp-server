var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application
var app = express();

// Add Middleaware necessary for REST API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(methodOverride('X-HTTP-Method-Override'));


// CORS Support

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	//res.header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/hello', function(req, res, next){
	res.send("Hello world!");
	next();
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/meanapp');

var db = mongoose.connection;

db.on('error', function(err) {
	console.log("Error connect.",err);
});

db.once('open', function(){


	// Load the models.
	app.models = require('./models/index');

	// Load the routes.
	var routes = require('./routes');
	_.each(routes, function(controller, route){
		app.use(route, controller(app, route));
	});



	console.log("star app port 3000");
	app.listen(3000);
});

