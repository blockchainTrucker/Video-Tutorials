const homeGET = require("../controllers/homeGET");
const createPOST = require("../controllers/createPOST");
const detailsGET = require("../controllers/detailsGET");
const registrationPOST = require("../controllers/registrationPOST");
const loginPOST = require("../controllers/loginPOST");
const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = (app) => {
	app.get("/", homeGET);

	app.get("/registration", function (req, res) {
		res.render("registration");
	});

	app.post("/registration", registrationPOST);

	app.get("/login", function (req, res) {
		res.render("login");
	});

	app.post("/login", loginPOST);

	app.get("/test", function (req, res) {
		tutorial.find({}).then((tutorial) => console.log(tutorial));
		res.render("404");
	});

	app.get("/details/:id", detailsGET);

	app.get("/profile", function (req, res) {
		res.render("profile");
	});

	app.get("/create-tutorial", function (req, res) {
		res.render("createTutorial");
	});

	app.post("/create-tutorial", createPOST);

	app.get("*", function (req, res) {
		res.render("404");
	});
};
