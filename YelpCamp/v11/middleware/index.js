// dependencies
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");

// middleware object
var middlewareObj   = {};

middlewareObj.chceckCampgoundOwnership= function (req, res, next){
    if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        }else{
            // check if the user is logged in owns the campground
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You do not have permission to do that");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function (req, res, next){
        if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                // check if the user is logged in owns the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
}

// Is logged in
middlewareObj.isLoggedIn= function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};


module.exports = middlewareObj;