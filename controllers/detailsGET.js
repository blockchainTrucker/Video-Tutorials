const fs = require("fs");

module.exports = function (req, res) {
	if (Number(req.params.id)) {
		let id = req.params.id;
		fs.readFile("./config/database.json", "utf8", (err, data) => {
			if (err) throw err;
			let tutorials = JSON.parse(data);
			let tutorialDetails = tutorials.find(
				(tutorial) => tutorial.id == id
			);
			let context = {
				...tutorialDetails,
			};
			res.render("details", context);
		});
	} else {
		res.redirect("/404");
	}
};
