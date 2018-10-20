const express = require("express");
const app = express();
const PORT = 3001;
const bodyParser  = require("body-parser");
const mongoose  = require("mongoose");
const passport  = require("passport");
const LocalStrategy  = require("passport-local");
const Resource = require("./models/resource");
const Comment  = require("./models/comment");
const User  = require("./models/user");
const seedDB = require("./mongoSeeds");


mongoose.connect("mongodb://localhost/resources");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seedDB();  //uncomment to refresh and seed the database


//===ETC  FOR PASSPORT ========

app.use(require("express-session")({
  secret:"test secret info",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});









/*
  // Resources psudo database
  let resources = [
    {name: "seed name 1", image: "https://images.unsplash.com/photo-1533569346453-2d5258ffdd87?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b95cbe468180d680b04b0727f22738dc&auto=format&fit=crop&w=400&q=60"},
    {name: "seed name 2", image: " https://images.unsplash.com/photo-1533560954233-eaed97b72d1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=943a4d6678b3d0f235cbf0b1ddfd30c0&auto=format&fit=crop&w=400&q=60"},
    {name: "seed name 3", image: " https://images.unsplash.com/photo-1533557068012-cd53d5ecbb0f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d442568190b51943f4ba73d368f011b3&auto=format&fit=crop&w=400&q=60"},
    {name: "seed name 4", image: " https://images.unsplash.com/photo-1536347233915-773803fcb763?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ccdccacc6c16db97c2ecf7392b990364&auto=format&fit=crop&w=400&q=60"}
  ] 

  */

app.get("/", function (req, res) {
  console.log("user has hit the root route");
  res.render("landing");
});

//will now render the INDEX  page that will show an index of the resources 
app.get("/resources", function (req, res) {
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
app.post("/resources", function (req, res) {
  //get data from the form and add to the resources array object
  console.log("user has hit the post route");
  let name = req.body.name;
  let image = req.body.image;
  let newResource = {name: name, image: image}
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
app.get("/resources/new", function (req, res) {
  res.render("resources/new");
});



// Displays info about each individual resource
app.get("/resources/:id", function (req, res) {
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

//======ROUTES FOR COMMENTS ======= vim search tag: Rcomm

app.get("/resources/:id/comments/new", isLoggedIn,  function (req, res) {
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



app.post("/resources/:id/comments", isLoggedIn, function (req, res) {
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



//========PASSPORT ROUTES =========== vim search tag: Rpass
// display the register form

app.get("/register", function (req, res) {
  res.render("register");

});

//register post
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
  res.render("login");

});

app.post("/login", passport.authenticate("local", {successRedirect: "/resources", failureRedirect: "/login" }),
  function (req, res) {
    
  });



//logout 
app.get("/logout", function (req, res) {
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



app.listen(PORT,'0.0.0.0', 'localhost', function () {
  console.log(`App.js Server Online listening on localhost ${PORT}`)
}); 


