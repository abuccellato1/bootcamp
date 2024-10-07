var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});
// route port
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "oink",
        cow: "moo",
        dog: "woof woof!",
        cat: "meow",
        snake: "hisss"
    }
    // tell it to look down the path of the animal & changes all requests to lower case
    var animal = req.params.animal.toLowerCase();
    // variable for sound after animal is found in path
    var sound = sounds[animal];
   res.send("The " + animal + " says '" + sound + "'"); 
});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = ""
    for(var i = 0; i <times; i++){
        result += message + " ";
    }
    res.send(result);
})

// catch all
app.get("*", function(req, res){
   res.send("Sorry, page not found...What are you doing with your life") 
});
// listening port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!!!");
});