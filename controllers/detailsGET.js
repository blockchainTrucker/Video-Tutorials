const jwt_decode = require("jwt-decode");
const tutorial = require("../models/Tutorial");

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
		if (tutorial.users.indexOf(jwtDetails.username) > -1) {
			context.subscribed = true;
		}
		let videoCode = tutorial.videoCode;
		videoCodeArray = videoCode.split(".be");
		videoCodeArray[0] = "https://youtube.com/embed";
		videoCode = videoCodeArray.join("");
		context.firstName = jwtDetails.firstName;
		context.loggedIn = loggedIn;
		context.id = tutorial._id;
		context.title = tutorial.title;
		context.description = tutorial.description;
		context.imageURL = tutorial.imageURL;
		context.creationDate = tutorial.creationDate;
		context.createdBy = tutorial.createdBy;
		context.videoCode = videoCode;
		res.render("details", context);
	});
};
