const fs = require("fs");

module.exports = function (req, res) {
	fs.readFile("./config/database.json", "utf8", (err, data) => {
		if (err) throw err;
		let tutorials = JSON.parse(data);
		let context = {
			tutorials: tutorials,
		};
		res.render("tutorials", context);
	});
};
