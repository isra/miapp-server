var mongoose = require('mongoose');

// Create the MovieSchema
var MovieSchema = new mongoose.Schema({
	title: {
		type: String
	},
	url: {
		type: String

	}
});

// Export the model
module.exports = mongoose.model('Movie', MovieSchema);