const createPOST = require("../controllers/createPOST");
const tutorialsGET = require("../controllers/tutorialsGET");
const detailsGET = require("../controllers/detailsGET");
const tutorial = require("../models/Tutorial");
const user = require("../models/User");

module.exports = (app) => {
	app.get("/", function (req, res) {
		res.render("index");
	});

	app.get("/registration", function (req, res) {
		res.render("registration");
	});

	app.get("/login", function (req, res) {
		res.render("login");
	});

	app.get("/tutorials", tutorialsGET);

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
