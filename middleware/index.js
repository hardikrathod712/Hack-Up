var Event = require("../models/event");
var User = require("../models/user");
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/signin");
}

module.exports = middlewareObj;