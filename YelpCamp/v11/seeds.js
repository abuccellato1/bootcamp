var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {
        name:"Cloud's Rest",
        image: "data:image/jpeg;base64,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",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nibh vel scelerisque pulvinar. Maecenas pretium blandit mi ut varius. Sed nec quam ac nibh ultrices gravida sit amet sed risus. Mauris vel nunc aliquet, commodo enim eu, feugiat nisl. Nunc varius, lectus quis blandit interdum, risus eros accumsan libero, sed porta nulla massa sed augue. Praesent consectetur urna ante, id hendrerit nisi imperdiet a. Etiam interdum posuere libero, sed finibus ligula aliquam sed. Sed nec orci commodo, lobortis urna sit amet, facilisis massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi at justo bibendum, dignissim lorem in, ornare turpis."
    },
    {
        name:"Granite Peaks",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_cpiIRVEOObwZUOydpFac7syNeIG3XbwpCCXqLm7t1tp9QXTyPw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nibh vel scelerisque pulvinar. Maecenas pretium blandit mi ut varius. Sed nec quam ac nibh ultrices gravida sit amet sed risus. Mauris vel nunc aliquet, commodo enim eu, feugiat nisl. Nunc varius, lectus quis blandit interdum, risus eros accumsan libero, sed porta nulla massa sed augue. Praesent consectetur urna ante, id hendrerit nisi imperdiet a. Etiam interdum posuere libero, sed finibus ligula aliquam sed. Sed nec orci commodo, lobortis urna sit amet, facilisis massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi at justo bibendum, dignissim lorem in, ornare turpis."
    },
    {
        name:"Red Cloud Campground",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp3SosADJH3WDURA2RpFgl164owMQ7-j9Ro7aZYb-eU59PDr-r",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nibh vel scelerisque pulvinar. Maecenas pretium blandit mi ut varius. Sed nec quam ac nibh ultrices gravida sit amet sed risus. Mauris vel nunc aliquet, commodo enim eu, feugiat nisl. Nunc varius, lectus quis blandit interdum, risus eros accumsan libero, sed porta nulla massa sed augue. Praesent consectetur urna ante, id hendrerit nisi imperdiet a. Etiam interdum posuere libero, sed finibus ligula aliquam sed. Sed nec orci commodo, lobortis urna sit amet, facilisis massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi at justo bibendum, dignissim lorem in, ornare turpis."
    },
]

function seedDB(){    
    // remove campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
            console.log("removed campgrounds!") 
        });
    // // add some campgrounds
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err,campground){
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log("added a campground");
    //             Comment.create(
    //                 {
    //                     text:"This place is great, but I wish there was internet",
    //                     author: "Homer"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err)
    //                     } else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("Created new comment");
    //                     }
    //                 });
    //         }
    //     });
    // });
    // // add some comments
}

module.exports = seedDB;