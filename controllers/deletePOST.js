const jwt_decode = require("jwt-decode");
const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	let id = req.params.id;
	tutorial.findByIdAndRemove(id).then((tutorial) => {
		res.status(201);
		res.cookie("status", {
			type: "success",
			message: "Tutorial deleted successfully!",
		});
		res.redirect("/profile");
	});
};
