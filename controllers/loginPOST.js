const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const saltConfig = require("../config/config").saltRounds;
const jwtConfig = require("../config/config").jwt;
const user = require("../models/User");

module.exports = function (req, res) {
	let username = req.body.username;
	username = username.toLowerCase();
	let pass = req.body.password;
	user.findOne({ username }).then((user) => {
		if (user != null) {
			bcrypt.compare(pass, user.password, (err, result) => {
				if (result) {
					res.status(200);
					let userToken = {
						id: user._id,
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
					};
					const token = jwt.sign(
						userToken,
						jwtConfig.secret,
						jwtConfig.options
					);
					res.cookie("user", token);
					res.cookie("status", {
						type: "success",
						message: "User Logged in!",
					});
					res.redirect("/");
				} else {
					res.status(406);
				}
			});
		}
	});
};
