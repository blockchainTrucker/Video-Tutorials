const mongoose = require("mongoose");
const user = require("./User");

const tutorialSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageURL: { type: String, required: true },
	isPublic: { type: String, required: true },
	creationDate: { type: String, required: true },
	createdBy: { type: String, required: true },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
