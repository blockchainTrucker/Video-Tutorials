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
	if (req.body.search != "") {
		tutorial
			.find({})
			.then((tutorials) => {
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
				let searchResults = [];
				for (let tutorial of tutorialArray) {
					if (tutorial.title.includes(req.body.search)) {
						searchResults.push(tutorial);
					}
				}
				for (let tutorial of tutorialArray) {
					if (
						tutorial.title.includes(
							req.body.search.charAt(0).toUpperCase()
						)
					) {
						searchResults.push(tutorial);
					}
				}
				for (let tutorial of tutorialArray) {
					if (tutorial.description.includes(req.body.search)) {
						searchResults.push(tutorial);
					}
				}
				context.searchResults = searchResults;
				res.render("search", context);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.cookie("status", {
			type: "failed",
			message: "Empty search",
		});
	}
};
