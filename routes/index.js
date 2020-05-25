var express = require("express");
var moment = require("moment");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var middleware = require("../middleware");

router.get("/",function(req,res){
	Event.find({}, function(err, foundEvents){
		if(err){
			console.log(err);
		}
		else{
			res.render("index", {events: foundEvents,moment:moment});
		}
	});
});

router.post("/apply", middleware.isLoggedIn, function(req, res) {
	console.log(req.body.name);

	var hackathon = {"name": req.body.name, "desc": req.body.desc};
	
	User.findOneAndUpdate({username: res.locals.currentUser.username}, {$push: {hackathons: hackathon}}, function(err, hackathon) {
		if(err) {
			console.log(err);
			res.redirect("/");
		}
		else {
			console.log("Successfull: " + hackathon);
			res.redirect("/profile");
		}
	});

});

router.delete("/apply/:id", function(req, res) {
	console.log(req.params.id);
	User.updateOne({username: res.locals.currentUser.username}, {$pull: {hackathons: { _id : req.params.id }}}, function(err, foundUser) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(foundUser.hackathons);
			res.redirect("/profile");
		}
	});
});

router.get("/signin",function(req,res){
	res.render("signin.ejs");
})

router.get("/signup",function(req,res){
	res.render("signup.ejs");
})

router.post("/signin", passport.authenticate("local", 
	{
		successRedirect: "/profile", 
	 	failureRedirect: "/signin"
	}), function(req, res){
});

router.post("/signup", function(req, res){
	var newUser = new User({firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.email});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			// req.flash("error", err.message);
			return res.send(err);
		}
		passport.authenticate("local",	{
			successRedirect: "/profile", 
			failureRedirect: "/signup"
		})(req, res, function(){
			console.log('Signed up');
		});
	});
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

router.get("/profile", middleware.isLoggedIn ,function(req, res){

	User.findOne({username: res.locals.currentUser.username}, function(err, foundUser) {
		if(err) {
			console.log(err);
			res.redirect("/signin");
		}
		else {
			console.log(foundUser.hackathons);
			res.render('user/profile', {hackathons: foundUser.hackathons});
		}
	});
});

module.exports = router;