const homeGET = require("../controllers/homeGET");
const createGET = require("../controllers/createGET");
const profileGET = require("../controllers/profileGET");
const createPOST = require("../controllers/createPOST");
const deletePOST = require("../controllers/deletePOST");
const detailsGET = require("../controllers/detailsGET");
const subscriptionPOST = require("../controllers/subscriptionPOST");
const editGET = require("../controllers/editGET");
const editPOST = require("../controllers/editPOST");
const four0fourGET = require("../controllers/four0fourGET");
const registrationPOST = require("../controllers/registrationPOST");
const loginPOST = require("../controllers/loginPOST");

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

	app.get("/details/:id", detailsGET);

	app.post("/details/:id/subscribed", subscriptionPOST);

	app.get("/profile", profileGET);

	app.get("/create-tutorial", createGET);

	app.post("/create-tutorial", createPOST);

	app.get("/edit-tutorial/:id", editGET);

	app.post("/edit-tutorial/:id", editPOST);

	app.get("/delete-tutorial/:id", deletePOST);

	app.get("/logout", (req, res) => {
		res.clearCookie("user");
		res.clearCookie("status");
		res.redirect("/");
	});

	app.get("*", four0fourGET);
};
