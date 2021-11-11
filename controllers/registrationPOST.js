const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = function (req, res) {
	let fields = req.body;
	let username = fields.username;
	let userExists = findByUsername(username);
	console.log(userExists);

	new user({
		firstName: fields.firstName,
		lastName: fields.lastName,
		password: fields.password,
		tutorials: fields.tutorials,
	})
		.save()
		.then((cube) => {
			console.log(cube);
			//console.log(newCube);
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};
