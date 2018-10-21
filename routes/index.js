const express  = require("express");
const router  = express.Router({mergeParams:true});
const Resource = require("../models/resource");
const Comment  = require("../models/comment");
const passport  = require("passport");
const User  = require("../models/user");

router.get("/", function (req, res) {
  console.log("user has hit the root route");
  res.render("landing");
});





//========PASSPORT ROUTES =========== vim search tag: Rpass
// display the register form

router.get("/register", function (req, res) {
  res.render("register");

});

//register post
router.post("/register", function (req, res) {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password,function (err,user) {
    if(err) {
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/resources");
    });
  }); 
});


//display the login form 
router.get("/login", function (req, res) {
  res.render("login");

});

router.post("/login", passport.authenticate("local", {successRedirect: "/resources", failureRedirect: "/login" }),
  function (req, res) {
    
  });



//logout 
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("resources");
});


// check if user is logged in 
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
