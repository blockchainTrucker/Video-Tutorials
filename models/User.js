const mongoose = require("mongoose");
const Tutorial = require("./Tutorial");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	username: { type: String, required: true },
	tutorials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutorial" }],
});

module.exports = mongoose.model("User", userSchema);
