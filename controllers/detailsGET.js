const jwt_decode = require("jwt-decode");
const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = function (req, res) {
	let context = {};
	let jwtDetails;
	let loggedIn;
	if (req.cookies.user != undefined) {
		let jwtToken = req.cookies.user;
		jwtDetails = jwt_decode(jwtToken);
		loggedIn = true;
	}
	let id = req.params.id;
	tutorial.findById(id).then((tutorial) => {
		let date = tutorial.creationDate;
		date = date.split(" ");
		tutorial.creationDate = `${date[1]} ${date[2]}, ${date[3]}`;
		let context = {
			firstName: jwtDetails.firstName,
			loggedIn: loggedIn,
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
