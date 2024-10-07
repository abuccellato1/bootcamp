var     express     =   require("express"),
        router      =   express.Router(),
        passport    =   require("passport"),
        User        =   require("../models/user"),
        middleware  =   require("../middleware");

// LANDING PAGE
router.get("/",function(req,res){
   res.render("landing"); 
});

// REGISTER
router.get("/register", function(req, res){
    res.render("register");
})

// SIGN UP LOGIC
router.post("/register", function (req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            // DISPLAYS PASSPORT ERROR
            console.log(err)
            req.flash("error", "" + err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("campgrounds");
        });
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
   res.render("login"); 
});

// LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

// LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you Out");
    res.redirect("/");
});

// USERNAME ROUTE
// router.get("/:username", middleware.isLoggedIn, function (req, res){
//     User.findById(req.params.user_id, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("profile", {username: req.user.username}) ;
//         }
//     });
// });

// EXPORT TO ROUTER
module.exports = router;