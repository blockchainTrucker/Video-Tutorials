const cookieParser = require("cookie-parser");
const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	let user = req.cookies.user;
	console.log(req.cookies.user);
	let context = {};
	if (user) {
		context.loggedIn = true;
	}
	tutorial.find({}).then((tutorials) => {
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
		let context = {
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
