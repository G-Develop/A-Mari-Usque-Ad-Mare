const express  = require("express");
const router  = express.Router({mergeParams:true});
const Resource = require("../models/resource");
const Comment  = require("../models/comment");


//will now render the INDEX  page that will show an index of the resources 
router.get("/", function (req, res) {
  console.log("user has hit the index route");
  console.log(req.user);
  //get all resources from the DB
  Resource.find({}, function (err, allResources){
    if(err){
      console.log(err);
    } else {
      res.render("resources/index", {resources:allResources, currentUser: req.user});
    }
  });
});

//CRUD CREATE via POST to /resources
router.post("/",isLoggedIn, function (req, res) {
  //get data from the form and add to the resources array object
  console.log("user has hit the post route");
  let name = req.body.name;
  let image = req.body.image;
  let caption = req.body.caption;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newResource = {name: name, image: image, caption: caption, author: author}
  //Create a new resource and save to DB
  Resource.create(newResource, function(err, freshResource) {
    if (err){
      console.log(err);
    } else {
      res.redirect("/resources");
    }
  });
});


//NEW Form that will help send the POST  to /resources 
router.get("/new", isLoggedIn,  function (req, res) {
  res.render("resources/new");
});



// Displays info about each individual resource
router.get("/:id", function (req, res) {
  // find resources with the :id 
  Resource.findById(req.params.id).populate("comments").exec(function(err, foundResource){
    if(err){
      console.log(err);
    } else {
      // render the display ejs
      res.render("resources/display", {resource: foundResource});
    }
  });

});

// check if user is logged in 
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;


