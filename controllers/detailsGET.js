const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = function (req, res) {
	let id = req.params.id;
	tutorial.findById(id).then((tutorial) => {
		let context = {
			id: tutorial._id,
			title: tutorial.title,
			description: tutorial.description,
			imageURL: tutorial.imageURL,
			videoURL: tutorial.videoURL,
			creationDate: tutorial.creationDate,
		};
		res.render("details", context);
	});
};
