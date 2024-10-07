var express = require("express");
var app = express();


//  "/" => "Hi tere!"
app.get("/", function(req, res){
   res.send("Hi there!"); 
});
//  "/bye"=> "goodbye"
app.get("/bye", function(req, res){
    res.send("goodbye");
});
//  "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW!");
});
// route for anywhere that doesn't have a specific request (think 404)- THIS MUST COME LAST
app.get("*", function(req, res){
   res.send("You are a Star!!!") 
});


// tell express where to listen (which port and specific IP)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!!!");
});