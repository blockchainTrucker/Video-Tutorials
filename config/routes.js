// TODO: Require Controllers...
const attach = require("../controllers/attach");
const createAccessoryPOST = require("../controllers/createAccessoryPOST");
const createPOST = require("../controllers/createPOST");
const detailsGET = require("../controllers/detailsGET");
const homeGET = require("../controllers/homeGET");

module.exports = (app) => {
	// TODO...
	app.get("/", homeGET);
	app.get("/registration", function (req, res) {
		res.render("registration");
	});
	app.get("/login", function (req, res) {
		res.render("login");
	});
	app.get("/courses", function (req, res) {
		//about page
		res.render("courses");
	});
	app.post("/create/cube", createPOST);
	app.get("/create/accessory", function (req, res) {
		//about page
		res.render("createAccessory");
	});
	app.post("/create/accessory", createAccessoryPOST);
	app.get("/attach/accessory/:id", attach.get);
	app.post("/attach/accessory/:id", attach.post);

	app.get("/details/:id", detailsGET);

	app.get("*", function (req, res) {
		//404 page
		res.render("404");
	});
};

// app.get("/test",function(req,res){

//     Cube.find({}).then(cubes=>{
//         console.log(cubes);
//     });
//     res.render("404");

// })
