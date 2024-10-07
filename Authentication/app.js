var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./models/users"),
    passportLocalMongoose   = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "booch",
    resave: false,
    saveUninitialized: false
}))  ;
// MUST HAVE FOR PASSPORT AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
// reading session, encoding and uncoding for log ins (passport-local-mongoose does that for you)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ============
// ROUTES
// ============
app.get("/", function(req,res){
   res.render("home"); 
});

app.get("/secret", isLoggedIn, function(req,res){
   res.render("secret"); 
});

// ==============
// AUTHENTICATION
// ==============
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function (err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.render("secret");
        });
    });
});

app.get("/login", function(req,res){
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// check for login on secret page
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.........");
})