const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = function (req, res) {
	console.log(req.body);
	let fields = req.body;
	if (fields.isPublic != undefined) {
		fields.isPublic = "off";
	}
	fields.creationDate = new Date();
	new tutorial({
		title: fields.title,
		imageURL: fields.imageURL,
		videoURL: fields.videoURL,
		description: fields.description,
		isPublic: fields.isPublic,
		creationDate: fields.creationDate,
		createdBy: "admin",
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
