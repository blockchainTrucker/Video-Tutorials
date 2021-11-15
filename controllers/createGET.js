const jwt_decode = require("jwt-decode");

module.exports = function (req, res) {
	let context = {};
	let jwtDetails;
	let loggedIn;
	if (req.cookies.user != undefined) {
		let jwtToken = req.cookies.user;
		jwtDetails = jwt_decode(jwtToken);
		loggedIn = true;
	}
	context = {
		loggedIn: loggedIn,
		firstName: jwtDetails.firstName,
	};
	res.render("createTutorial", context);
};
