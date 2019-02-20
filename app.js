//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ =  require('lodash');
const mongoose = require('mongoose');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let title1 = "";
let conten1 = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogsDB", { useNewUrlParser: true });


const blogsSchema = {
  title: String,
  content: String
};

const Blog = mongoose.model("Blog", blogsSchema);



// GETS

app.get("/", function(req,res){

  Blog.find({}, function(err, foundBlogs) {

    res.render("home", {homeInit: homeStartingContent, posts: foundBlogs});

  });


});

app.get("/about", function(req,res){
  res.render("about", {aboutInit: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactInit: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose", {contactInit: contactContent});
});

// + GET function that allows access to individual posts based on their title in the post view

app.get('/posts/:id', function (req, res) {

  let reqID = req.params.id;
  var match = false;

  Blog.findOne({_id : reqID} , function(err, foundBlog){

    res.render("post", {header: foundBlog.title, content: foundBlog.content});


});
});

// POSTS

app.post("/compose", function(req,res){


  const post1 = new Blog({
    title : req.body.postTitle,
    content : req.body.postContent
  });

  post1.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });



  res.redirect("/");

});


app.listen(3000, function() {
  console.log("Server is running");
});
