
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var articleSchema = new mongoose.Schema({
    Title : String,
    Image : String,
    Description : String,
    createdAt : {
        type : Date,
        default : new Date()

    }
});

// pluggin
articleSchema.plugin(passportLocalMongoose);


var article = mongoose.model("Articles", articleSchema);

module.exports = article;