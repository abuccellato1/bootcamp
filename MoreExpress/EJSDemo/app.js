var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
// Routes
app.get("/", function (req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req,res){
    var thing= req.params.thing;
    
    // render the variable from your .ejs to the varable on your app.js
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "post 1", author: "Susy"}, 
        {title: "My Adorable Pet Bunny", author: "Charlie"}, 
        {title: "Can You Belive THis Pomsky", author: "Me"} 
    ]
    res.render("posts", {posts:posts})
});

// Sever Port Listening (PORT/IP must be capitalized!!!)
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening!!!");
});