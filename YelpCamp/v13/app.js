// dependencies
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    
// models
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user")
    // seedDB          = require("./seeds");

// routes location
var commentRoutes       =   require("./routes/comments"),
    campgroundRoutes    =   require("./routes/campgrounds"),
    indexRoutes         =   require("./routes/index");

// ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// CONFIGS LOCATION (DB, PASSPORT, LOCAL ENV)
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGS
app.use(require("express-session")({
    secret: "booch",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// reading session, encoding and uncoding for log ins (passport-local-mongoose does that for you)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    // DEFINE EACH ERROR TYPE HERE (ALLOWS DIFFERENT COLORS OR TYPES)
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    // GO TO NEXT STEP
    next();
});


// Sever Port Listening (PORT/IP must be capitalized!!!)
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Has Started!!!");
});