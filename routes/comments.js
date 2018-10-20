const express  = require("express");
const router  = express.Router({mergeParams:true});
const Resource = require("../models/resource");
const Comment  = require("../models/comment");

//======ROUTES FOR COMMENTS ======= vim search tag: Rcomm

router.get("/new", isLoggedIn,  function (req, res) {
  // find resource with the :id 
  Resource.findById(req.params.id,function(err, resource){
    if(err){
      console.log(err);
    } else {
      // render the comments/new
      res.render("comments/new", {resource: resource});
    }
  });

});



router.post("/", isLoggedIn, function (req, res) {
  // query resource with the :id 
  Resource.findById(req.params.id,function(err, resource){
    if(err){
      console.log(err);
      res.redirect("/resources");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
       if(err){
         console.log(err);
       } else {
         resource.comments.push(comment);
         resource.save();
         res.redirect("/resources/" + resource._id)
       }
      });
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
