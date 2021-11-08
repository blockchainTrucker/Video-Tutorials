const mongoose = require("mongoose");
const User = require("./User");

const tutorialSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imgageURL: { type: String, required: true },
	videoURL: { type: String, required: true },
	isPublic: { type: Boolean, required: true },
	creationDate: { type: String, required: true },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
