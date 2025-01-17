var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    user: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: "Hermoine@hogwarts.ed",
//   name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding go to potions class to learn it"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });

User.findOne({user: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "3 things I hate",
            content: "Vodlemort. Vodlemort. Vodlemort."
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});