const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	tutorial.find({}).then((tutorials) => {
		let tutorialArray = tutorials.map((tutorial) => {
			let subTutorial = {
				id: tutorial._id,
				title: tutorial.title,
				description: tutorial.description,
				createDate: tutorial.creationDate,
				users: tutorial.users,
				imageURL: tutorial.imageURL,
				videoURL: tutorial.videoURL,
			};

			return subTutorial;
		});
		let context = {
			tutorials: tutorialArray,
		};
		res.render("tutorials", context);
	});
};
