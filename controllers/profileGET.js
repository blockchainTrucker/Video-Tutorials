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
		context.lastName = jwtDetails.lastName;
		context.username = jwtDetails.username;
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
				createdBy: tutorial.createdBy,
			};

			return subTutorial;
		});

		tutorialArray = tutorialArray.sort(
			(a, b) => b.users.length - a.users.length
		);
		let userTutorials = [];
		for (let tutorial of tutorialArray) {
			if (tutorial.createdBy == jwtDetails.username) {
				userTutorials.push(tutorial);
			}
		}
		context.tutorials = userTutorials;

		res.render("profile", context);
	});
};
