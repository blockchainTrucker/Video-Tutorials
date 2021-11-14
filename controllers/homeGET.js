const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	tutorial.find({}).then((tutorials) => {
		console.log(tutorials);
		let tutorialArray = tutorials.map((tutorial) => {
			let subTutorial = {
				id: tutorial._id,
				title: tutorial.title,
				description: tutorial.description,
				createDate: tutorial.creationDate,
				users: tutorial.users,
				imageURL: tutorial.imageURL,
			};

			return subTutorial;
		});
		tutorialArray = tutorialArray.sort(
			(a, b) => b.users.length - a.users.length
		);
		let tutorial1 = tutorialArray[0];
		let tutorial2 = tutorialArray[1];
		let tutorial3 = tutorialArray[2];
		let context = {
			loggedIn: true,
			tutorial1title: tutorialArray[0].title,
			tutorial1pic: tutorialArray[0].imageURL,
			tutorial2title: tutorialArray[1].title,
			tutorial2pic: tutorialArray[1].imageURL,
			tutorial3title: tutorialArray[2].title,
			tutorial3pic: tutorialArray[2].imageURL,
			tutorials: tutorialArray,
		};
		res.render("index", context);
	});
};
