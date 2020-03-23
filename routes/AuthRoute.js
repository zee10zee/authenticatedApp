
var express = require("express");
var router = express.Router();
var passport = require("passport");
var methodOverride = require("method-override");
var user = require("../models/userdb");
var middleware = require("../middleWares/middleware");


    
router.get("/register", (req, res)=>{
    res.render("registry/register");
})

router.post("/register", (req, res)=>{

    user.register(new user({username : req.body.username}), req.body.password, (err, regUser)=>{
        if(err){
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/articles");
            })
        }
    })
});


    //  login one
router.get("/login", (req, res)=>{
   res.render("registry/login");
})

router.post("/login",passport.authenticate("local", {
    successRedirect : "/articles",
    failureRedirect : "/login"
}),(req, res)=>{
      
});

// logout 

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/login");
});

module.exports = router;