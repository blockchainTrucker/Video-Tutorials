const jwt_decode = require("jwt-decode");
const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	let context = {};
	let jwtDetails;
	if (req.cookies.user != undefined) {
		let jwtToken = req.cookies.user;
		jwtDetails = jwt_decode(jwtToken);
		context.loggedIn = true;
		context.firstName = jwtDetails.firstName;
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

		(context.tutorial1title = tutorialArray[0].title),
			(context.tutorial1pic = tutorialArray[0].imageURL),
			(context.tutorial2title = tutorialArray[1].title),
			(context.tutorial2pic = tutorialArray[1].imageURL),
			(context.tutorial3title = tutorialArray[2].title),
			(context.tutorial3pic = tutorialArray[2].imageURL),
			(context.tutorials = tutorialArray),
			res.render("index", context);
	});
};
