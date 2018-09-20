var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongoURI = "mongodb://pierre1326:profesoR1@ds261342.mlab.com:61342/dbaas";

mongoose.connect(mongoURI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

/*
	String.
	Number.
	Date.
	Buffer.
	Boolean.
	Mixed.
	ObjectId.
	Array.
*/
var dogSchema = new mongoose.Schema({
		name: String,
		breed: String
	});

app.get("/", function(req,res){
	res.render("home");
});

app.get("/newDog", function(req,res){
	res.render("newDog");
});

app.get("/allDogs", function(req,res){
	var dogs = mongoose.model("Dogs", dogSchema);

	dogs.find(function(err, dbDogs){
		console.log(dbDogs)
		res.render("allDogs", {allDogs : dbDogs});
	});
});

app.post("/newDog", function(req, res){
	var dogs = mongoose.model("Dogs", dogSchema);

	dogs.create({name: req.body.name, breed: req.body.breed}, function(err, dog){
		if(err){
			console.log("Error agregando a la base de datos");
		}else{
			console.log(dog);
		}
	});

	res.redirect("/");
});

app.listen(5000, function(){
	console.log("Serving app on port 5000");
});