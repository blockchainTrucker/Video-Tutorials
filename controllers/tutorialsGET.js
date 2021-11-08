const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	tutorial.find({}).then((tutorials) => {
		// console.log(tutorials);
		let tutorialArray = tutorials.map((tutorial) => {
			let subTutorial = {
				id: tutorial._id,
				title: tutorial.title,
				description: tutorial.description,
				creationDate: tutorial.creationDate,
				users: tutorial.users,
				imageURL: tutorial.imageURL,
			};
			return subTutorial;
		});
		console.log(tutorialArray);
		let context = {
			tutorials: tutorialArray,
		};
		res.render("tutorials", context);
	});
};
