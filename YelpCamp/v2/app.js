var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// schema setup
var campgoundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgoundSchema);

// Create campgrounds to fill in the database
// Campground.create(
// //     {
// //         name: "Timber Mill", 
// //         image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRMH9YQilDOVUstGYz7aT4S895lEW21Sjfoa-f5OkNU5srNvv7zGA",
// //         description: "This is a huge Timber Mill with bathrooms! Beautiful site!"
// //     }, function (err, Campground){
// //     if(err){
// //         console.log("err")
// //     }else{
// //         console.log("newly created campground");
// //         console.log(Campground);
// //     }
// // });

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
            res.render("index",{campgrounds:allCampgrounds});
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
   res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req,res){
    // find campground by mongoDB ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // render show template
            res.render("show", {campground: foundCampground});
        };
    });
});

// Sever Port Listening (PORT/IP must be capitalized!!!)
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!!!");
});