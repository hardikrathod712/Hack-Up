var express = require("express");
var moment = require("moment");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");

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
			// req.flash("success", "Welcome to YelpCamp " + user.username + "!!");
			console.log('Signed up');
		});
	});
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	// req.flash("success", "Logged you out!!");
	res.redirect("/");
});

router.get("/profile", function(req, res){
	res.render('user/profile');
});

module.exports = router;