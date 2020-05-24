var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
	name: String,
	startDate: Date,
	endDate: Date,
	website: String,
	description: String,
	address: String
});

module.exports = mongoose.model("Event", EventSchema);