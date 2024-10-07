var     express     =   require("express"),
        router      =   express.Router(),
        Campground  =   require("../models/campground"),
        Comment     =   require("../models/comment"),
        User        =   require("../models/user"),
        middleware  =   require("../middleware");
        
// SHOW PROFILE
router.get("/:username", middleware.isLoggedIn, function (req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("profile", {username: req.user.username}) ;
        }
    });
});

// EXPORT TO ROUTER
module.exports = router;