var express = require("express"),
router = express.Router();
var middleware = require("../middleWares/middleware");
var article = require("../models/articlesDB");



router.get("/",(req, res)=>{
    article.find((err, foundArticles)=>{
        if(!err){
          res.render("index", { articles : foundArticles});     
        }
    }).sort({createdAt : "desc"});
});


router.get("/new",middleware.loggedIn,(req, res)=>{
    res.render("new");
});

router.post("/new", (req, res)=>{
    var newArticle = new article({
        Title : req.body.title,
        Image : req.body.image,
        Description : req.body.content,
    });
    newArticle.save((err, createdArticle)=>{
        if(!err){
            console.log("successfuly created ne article ");
            res.redirect("/articles");
        }else{
            res.redirect("/new");
        }
    })
});

// show more button

router.get("/:id/show", (req, res)=>{
    var articleName  = req.params.id;
    article.findById(articleName, (err, foundarticle)=>{
        if(!err){
          
                res.render("showMore", {article: foundarticle});
                console.log("show more succeeded!");
         
        }else{
            res.redirect("/articles");
            console.log(err);
        }
    })
});


// edit route 
router.get("/:id/edit", (req, res)=>{
    article.findById(req.params.id,(err, foundArticle)=>{
        if(!err){
            res.render("edit", {article : foundArticle});
        }else{
            res.redirect("/articles/" + req.params.id + "/show");
        }
    })
});

router.put("/:id/update" ,(req, res)=>{
    var editArticles = {
        Title : req.body.title,
        Image: req.body.image,
        Descrioption : req.body.content,
    }
    article.findByIdAndUpdate(req.params.id, (editArticles), (err, updatedArticle)=>{
        if(!err){
            res.redirect("/articles/" + req.params.id + "/show");
        }else{
            res.redirect("/articles/" + req.params.id + "/edit");
            res.redirect(err)
        }
    })
});

// delete route

router.delete("/:id", (req, res)=>{
    article.findByIdAndDelete(req.params.id, (err)=>{
        if(!err){
            res.redirect("/articles");
        }else{
            console.log(err);
        }
    })
});


module.exports = router;


