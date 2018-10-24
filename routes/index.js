const express  = require("express");
const router  = express.Router();
const passport  = require("passport");
const User  = require("../models/user");



//Root 
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
      req.flash("error, err.message")
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", user.username + "is Logged in")
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
  req.flash("success", "Logged out!")
  res.redirect("resources");
});




module.exports = router;
