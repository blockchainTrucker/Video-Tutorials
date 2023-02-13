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
				isPublic: tutorial.isPublic,
			};

			return subTutorial;
		});
		tutorialArray = tutorialArray.sort(
			(a, b) => b.users.length - a.users.length
		);
		let publicTutorials = [];
		for (let tutorial of tutorialArray) {
			if (tutorial.isPublic == "on") {
				publicTutorials.push(tutorial);
			}
		}
		(context.tutorials = publicTutorials),
		(context.existing = true),
		(context.tutorial1title = publicTutorials[0].title),
		(context.tutorial1pic = publicTutorials[0].imageURL),
		(context.tutorial2title = publicTutorials[1].title),
		(context.tutorial2pic = publicTutorials[1].imageURL),
		(context.tutorial3title = publicTutorials[2].title),
		(context.tutorial3pic = publicTutorials[2].imageURL),		
		res.render("index", context);
	}).catch((err) => {
		console.log(err);
		(context.existing = false),
		res.render("index", context);
	});
};
