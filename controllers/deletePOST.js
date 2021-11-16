const jwt_decode = require("jwt-decode");
const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	let id = req.params.id;
	tutorial.findByIdAndRemove(id).then((tutorial) => {
		res.redirect("/profile");
	});
};
