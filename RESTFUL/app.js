// STACK REQUIREMENTS
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    methodOverride =require("method-override"),
    expressSanitizer= require("express-sanitizer"),
    mongoose    = require("mongoose");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    create: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES
app.get("/", function(req, res){
   res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function (req,res){
    // always put the {} to bring the whole object
    Blog.find({}, function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs:blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
        //   redirect on error
          res.redirect("/blogs");
      } else{
        //   render the page with blog id
          res.render("show", {blog: foundBlog});
      }
   });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("edit", {blog: foundBlog});
       }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DESTROY (DELTE) ROUTE
app.delete("/blogs/:id", function(req, res){
    // destroy
    Blog.findByIdAndRemove(req.params.id, function(err, removeBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
});

// Sever Port Listening (PORT/IP must be capitalized!!!)
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Blog Roll Started!!!");
});