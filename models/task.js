// set up the structure for future documents and assign them to the collection

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	// name: String,
	name: {
		type: String, // set up type
		// required: true
		required: [true, 'must provide name'], // required? true/false? custom message?
		trim: true, // no whitespace
		maxlength: [20, 'name cannot be more than 20 characters'] // min avail too
	}, // set up property equal to an object
	
	// completed: Boolean
	completed: {
		type: Boolean,
		default: false // default value option
	}
});

// model as representation of collection
module.exports = mongoose.model('Task', TaskSchema);