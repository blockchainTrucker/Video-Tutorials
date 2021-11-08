const fs = require("fs");

const VideoTutorial = require("../VideoTutorial.js");

module.exports = function (req, res) {
	let fields = req.body;
	let newTutorial = new VideoTutorial(
		fields.title,
		fields.imageURL,
		fields.videoURL,
		fields.description,
		fields.public
	);
	fs.readFile("./config/database.json", "utf8", (err, data) => {
		if (err) throw err;
		let tutorials = JSON.parse(data);
		tutorials.push(newTutorial);
		let json = JSON.stringify(tutorials);
		fs.writeFile("./config/database.json", json, (err) => {
			if (err) throw err;
		});
	});
	res.redirect("/tutorials");
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
