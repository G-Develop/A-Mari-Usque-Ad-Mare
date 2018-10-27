let resource = require("../models/resource");
let Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkResourceOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        resource.findById(req.params.id, function(err, foundResource){
           if(err){
            req.flash("error", "Resource could not be located")
            res.redirect("back");
           } else {
               if(foundResource.author.id.equals(req.user._id)) {
               next();
            } else {
                req.flash("error", "permission denied!")
                res.redirect("back");
             }
           }
        });
    } else {
        req.flash("error", "your not logged in!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
             res.redirect("back");
           }  else {
            if(foundComment.author.id.equals(req.user._id)) {
              next();
            } else {
              req.flash("error", "permission denied!")
              res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "your not logged in!")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error","your not logged in!" )
    res.redirect("/login");
}

module.exports = middlewareObj;
