const jwt_decode = require("jwt-decode");
const tutorial = require("../models/Tutorial");

module.exports = function (req, res) {
	console.log(req);
	let context = {};
	let jwtDetails;
	if (req.cookies.user != undefined) {
		let jwtToken = req.cookies.user;
		jwtDetails = jwt_decode(jwtToken);
		context.loggedIn = true;
		context.firstName = jwtDetails.firstName;
	}
	let fields = req.body;
	let id = fields.id;
	context.id = fields.id;
	context.title = fields.title;
	context.description = fields.description;
	context.imageURL = fields.imageURL;
	context.videoCode = fields.videoCode;
	if (fields.isPublic == undefined) {
		fields.isPublic = "off";
	}
	fields.creationDate = new Date();
	let descriptionRegex = new RegExp(/[\w\W+]{20,}/g);
	let titleRegex = new RegExp(/[a-zA-Z]{4,20}/);
	let imageRegex = new RegExp(/^(http|https):\/\//);
	let videoRegex = new RegExp(/^(https):\/\/youtu\.be/);
	let titleGood = false;
	let descriptionGood = false;
	let imageGood = false;
	let videoGood = false;

	if (!titleRegex.test(fields.title)) {
		context.titleError = "titleError";
		context.titleMessage = "Title must be 4 to 20 characters";
		titleGood = false;
	} else {
		context.titleError = "";
		titleGood = true;
	}
	if (!descriptionRegex.test(fields.description)) {
		context.descriptionError = "descriptionError";
		context.descriptionMessage = "Description must be 20 characters long";
		titleGood = false;
	} else {
		context.descriptionError = "";
		descriptionGood = true;
	}
	if (!imageRegex.test(fields.imageURL)) {
		context.imageError = "imageError";
		context.imageMessage = "Image URL must begin with http:// or https://";
		imageGood = false;
	} else {
		context.imageError = "";
		imageGood = true;
	}
	if (!videoRegex.test(fields.videoCode)) {
		context.videoError = "videoError";
		context.videoMessage = "Video URL must begin with https://youtu.be";
		videoGood = false;
	} else {
		context.imageError = "";
		videoGood = true;
	}
	if (
		titleGood == false ||
		descriptionGood == false ||
		imageGood == false ||
		videoGood == false
	) {
		res.render("editTutorial", context);
	} else {
		tutorial.findById(id).then((tutorial) => {
			tutorial.title = fields.title;
			tutorial.description = fields.description;
			tutorial.imageURL = fields.imageURL;
			tutorial.isPublic = fields.isPublic;
			tutorial
				.save()
				.then((tutorial) => {
					res.status(201);
					res.cookie("status", {
						type: "success",
						message: "Tutorial edited successfully",
					});
					res.redirect(`/details/${id}`);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
};
