var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var session = require("express-session"),
    passport = require("passport"),
    passportLocal = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    var middleware = require("./middleWares/middleware");

    var article = require("./models/articlesDB");
    var user = require("./models/userdb");

    var articleRoute = require("./routes/router");
    var AuthRouter = require("./routes/AuthRoute");
    var app  = express();


mongoose.connect("mongodb://localhost/ArticlesDB" , {useNewUrlParser : true,  useUnifiedTopology: true });

mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


app.use(session({
    secret : "no secret yet!",
    resave : false,
    saveUninitialized : false
}))

// initializing passport 

app.use(passport.initialize());
// setting the session
app.use(passport.session());

// passport local config
passport.use(new passportLocal(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// edited : below is to use javascript into html code locally 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/articles", articleRoute);
app.use(AuthRouter);


// routes 
app.get("/",(req, res)=>{
    article.find((err, foundArticles)=>{
        if(!err){
          res.render("index", { articles : foundArticles});     
        }
    }).sort({createdAt : "desc"});
});


app.listen(3000 || process.env.PORT,()=>{
    console.log("port 3000 is running !");
});
