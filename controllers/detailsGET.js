const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = function (req, res) {
	let id = req.params.id;
	tutorial.findById(id).then((tutorial) => {
		let date = tutorial.creationDate;
		date = date.split(" ");
		tutorial.creationDate = `${date[1]} ${date[2]}, ${date[3]}`;
		let context = {
			id: tutorial._id,
			title: tutorial.title,
			description: tutorial.description,
			imageURL: tutorial.imageURL,
			creationDate: tutorial.creationDate,
			createdBy: tutorial.createdBy,
		};
		res.render("details", context);
	});
};
