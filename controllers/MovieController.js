var Resource = require('resourcejs');

module.exports = function(app, route) {

	// Setup the controller for REST
	var  resource = Resource(app, '', route, app.models.movie).rest();

	console.log(resource.swagger());

	// Return middleware
	return function(req, res, next){
		next();
	};

};