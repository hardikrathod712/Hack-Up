var express = require("express");
var app = express();
var mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local");
var User = require("./models/user");
var Event = require("./models/event");
var bodyParser = require("body-parser");
var seedDB = require("./data");

var indexroute = require("./routes/index");

mongoose.connect("mongodb://localhost/hackup");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
	secret: "PHAB",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// seedDB();

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use(indexroute);

app.listen(3000,()=>{
	console.log("Server Running");
})