
var express = require("express");

   
var middleware = {};

middleware.loggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middleware;
