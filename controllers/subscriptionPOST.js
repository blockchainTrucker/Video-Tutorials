const tutorial = require("../models/Tutorial");
const jwt_decode = require("jwt-decode");

module.exports = function (req, res) {
	let context = {};
	let jwtDetails;
	let username;
	if (req.cookies.user != undefined) {
		let jwtToken = req.cookies.user;
		jwtDetails = jwt_decode(jwtToken);
		context.loggedIn = true;
		context.firstName = jwtDetails.firstName;
		username = jwtDetails.username;
	}
	let id = req.params.id;

	tutorial.findById(id).then((tutorial) => {
		let userArray = tutorial.users;
		let length = userArray.length;
		userArray[length] = username;
		tutorial.users = userArray;
		tutorial
			.save()
			.then((tutorial) => {
				res.cookie("status", {
					type: "success",
					message: `Subscription to ${tutorial.title} was successful`,
				});
				res.redirect(`/details/${id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	});
};
