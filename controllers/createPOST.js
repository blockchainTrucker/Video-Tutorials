const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = function (req, res) {
	console.log(req.body);
	let fields = req.body;
	new tutorial({
		title: fields.title,
		imageURL: fields.imageURL,
		videoURL: fields.videoURL,
		description: fields.description,
		isPublic: fields.isPublic,
		creationDate: "test",
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

// const Cube = require("../models/Tutorials");
// const Accessories = require("../models/Users");

// module.exports = function (req, res) {
// 	console.log("Creating a CUBE!!");

// 	console.log(req.body);
// 	let fields = req.body;
// 	new Cube({
// 		name: fields.name,
// 		description: fields.description,
// 		imgURL: fields.imgURL,
// 		difficulty: fields.difficulty,
// 		accessories: fields.accessories,
// 	})
// 		.save()
// 		.then((cube) => {
// 			console.log(cube);
// 			//console.log(newCube);
// 			res.redirect("/");
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// };
