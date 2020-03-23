
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   username : String,
   password : String
});

// LOCAL MONGOOSE IS BEING PLUGGED INTO userSCHEMA 
userSchema.plugin(passportLocalMongoose);

var user = mongoose.model("User", userSchema);


module.exports = user;