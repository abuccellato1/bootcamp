var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    user: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

Post.create({
    title: "How to cook the best buger part 2",
    content: "blah blah blah blah blah blah"
}, function(err, post){
   User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
       if(err){
           console.log(err);
       }else{
           foundUser.Post.push(post);
           foundUser.save(function(err,data){
               if(err){
                   console.log(err);
               }else{
                   console.log(data);
               }
           });
       }
   });
});