const express  = require("express");
const router  = express.Router({mergeParams:true});
const Resource = require("../models/resource");
const Comment  = require("../models/comment");
const middleware  = require("../middleware");

//======ROUTES FOR COMMENTS ======= vim search tag: Rcomm


//New Comments
router.get("/new",middleware.isLoggedIn,  function (req, res) {
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


//Create Comments
router.post("/", middleware.isLoggedIn, function (req, res) {
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
         comment.author.id = req.user._id;   //ading id to the comment
         comment.author.username = req.user.username; //ading username to the comment
         comment.save();  //saving comment
         resource.comments.push(comment);
         resource.save();
         console.log(comment);
         res.redirect("/resources/" + resource._id);
       }
      });
    }
  });

});

//Edit Comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {resource_id: req.params.id, comment: foundComment});
      }
   });
});


//Update Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/resources/" + req.params.id );
      }
   });
});


//Destroy Comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/resources/" + req.params.id);
       }
    });
});







module.exports = router;
