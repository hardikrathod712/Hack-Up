var mongoose = require("mongoose");
var Event = require("./models/event");
var User = require("./models/user");

var data = [
{
	name: "KJSCE Hackathon",
	startDate: new Date("2020-03-21"),
	endDate: new Date("2020-03-22"),
	website: "kjsce.com",
	description: "KJSCE Hackathon Organised by KJSCE Codecell Council",
	address: "K.J. Somaiya College of Engineering, Vidyavihar"
},
{
	name: "DJSCE Hackathon",
	startDate: new Date("2020-04-21"),
	endDate: new Date("2020-04-22"),
	website: "djsce.com",
	description: "DJSCE Hackathon Organised by DJSCE Student Council",
	address: "D.J. Sanghvi College of Engineering, Vile Parle"
}
];

function seedDB(){

	Event.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed Events!!!");

		data.forEach(function(seed){
		Event.create(seed,function(err,event){
				if(err){
					console.log(err);
				}
				else{
					console.log("added an event");
				}
			});
		});
	});
}
module.exports = seedDB;