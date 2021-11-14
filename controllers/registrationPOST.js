const user = require("../models/User");
const saltConfig = require("../config/config").saltRounds;
let bcrypt = require("bcrypt");

module.exports = function (req, res) {
	let username = req.body.username.toLowerCase();
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let tutorials;
	let pass = req.body.password;
	let rePass = req.body.passwordRep;
	let context = {};
	context.username = username;
	context.firstName = firstName;
	context.lastName = lastName;
	let userRegex = new RegExp(/[A-z]{1}[A-z0-9_]{4,24}/);
	let nameRegex = new RegExp(/[a-zA-Z]{2,24}/);
	let passRegex = new RegExp(/[\S+]{6,24}/);
	let firstGood = false;
	let lastGood = false;
	let userGood = false;
	let passGood = false;
	let passRepGood = false;

	if (!nameRegex.test(firstName)) {
		context.fnError = "fnError";
		context.fnMessage = "First name must be at least 2 characters";
		firstGood = false;
	} else {
		context.fnError = "";
		firstGood = true;
	}
	if (!nameRegex.test(lastName)) {
		context.lnError = "lnError";
		context.lnMessage = "Last name must be at least 2 characters";
		lastGood = false;
	} else {
		context.lnError = "";
		lastGood = true;
	}
	if (!userRegex.test(username)) {
		context.usernameError = "usernameError";
		context.userMessage = "Username must be at least 5 characters";
		userGood = false;
	} else {
		context.usernameError = "";
		userGood = true;
	}
	if (!passRegex.test(pass)) {
		context.passError = "passError";
		context.passMessage = "Password must be at least 6 characters";
		passGood = false;
	} else {
		context.passError = "";
		passGood = true;
	}
	if (rePass !== pass) {
		context.passRepError = "passRepError";
		context.passRepMessage = "Passwords do not match";
		passRepGood = false;
	} else {
		context.passRepError = "";
		passRepGood = true;
	}
	if (
		firstGood == false ||
		lastGood == false ||
		userGood == false ||
		passGood == false ||
		passRepGood == false
	) {
		res.render("registration", context);
	} else {
		user.find({ username: username }).then((users) => {
			if (users.length > 0) {
				context.usernameError = "usernameError";
				context.userMessage = "Username is unavailable";
				userGood = false;
				return res.render("registration", context);
			}
			if (userGood) {
				bcrypt.genSalt(saltConfig, (err, salt) => {
					bcrypt.hash(pass, salt, (err, hash) => {
						new user({
							firstName: firstName,
							lastName: lastName,
							username: username,
							password: hash,
							tutorials: tutorials,
						})
							.save()
							.then((user) => {
								res.status(201);
								res.cookie("status", {
									type: "success",
									message: "User created!",
								});
								context.type = "success";
								context.message =
									"User created successfully... Please sign in";
								res.render("login", context);
							})
							.catch((err) => {
								console.log(err);
							});
					});
				});
			}
		});
	}
};
