var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res){
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

app.post("/campgrounds", function(req, res){
    // get data from form & add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    // fist in pair is DBschema, second is var name in app.js file
    var newCampground = {name: name, image: image, description:desc};
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

app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
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


// ========================
// COMMENT ROUTES (NESTED)
// ========================
app.get("/campgrounds/:id/comments/new", function (req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground:campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function (req, res){
    // lookup campground by id
    Campground.findById(req.params.id, function (err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    }); 

});


// Sever Port Listening (PORT/IP must be capitalized!!!)
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!!!");
});