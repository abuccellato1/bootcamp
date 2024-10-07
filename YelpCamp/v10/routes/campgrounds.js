var     express     =   require("express"),
        router      =   express.Router(),
        Campground  =   require("../models/campground"),
        Comment     =   require("../models/comment"),
        middleware  =   require("../middleware")


router.get("/", function(req,res){
    // redirected to DB not original array
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            // this is index because lots of paths are derived from it (landing pages are separate entities)
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form & add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // fist in pair is DBschema, second is var name in app.js file
    var newCampground = {name: name, image: image, description:desc, author: author};
    // create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    })
    
});

// Campground New
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});

// Campground Show
router.get("/:id", function(req,res){
    // find campground by mongoDB ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            // render show template
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit Campground
router.get("/:id/edit", middleware.chceckCampgoundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground:foundCampground});
    });
});

//Update Campground 
router.put("/:id",middleware.chceckCampgoundOwnership, function(req, res){
    // find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE CAMPGROUND
router.delete("/:id", middleware.chceckCampgoundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
   })
   
});

// Export
module.exports = router;