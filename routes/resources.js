const express  = require("express");
const router  = express.Router();
const Resource = require("../models/resource");
const middleware  = require("../middleware");
const NodeGeocoder  = require('node-geocoder');

let options = {
  provider: 'google', 
  httpAdapter:'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

//will now render the INDEX  page that will show an index of the resources 
router.get("/", function (req, res) {
  console.log("user has hit the index route");
  console.log(req.user);
  //get all resources from the DB
  Resource.find({}, function (err, allResources){
    if(err){
      console.log(err);
    } else {
      res.render("resources/index", {resources:allResources});
    }
  });
});

////Uncomment for Maps to work 
////CREATE - add new resource to DB
//router.post("/", middleware.isLoggedIn, function(req, res){
  //// get data from form and add to resources array
  //let name = req.body.name;
  //let image = req.body.image;
  //let caption = req.body.caption;
  //let author = {
      //id: req.user._id,
      //username: req.user.username
  //}
  //geocoder.geocode(req.body.location, function (err, data) {
    //if (err || !data.length) {
      //req.flash('error', 'Invalid address');
      //return res.redirect('back');
    //}
    //let lat = data[0].latitude;
    //let lng = data[0].longitude;
    //let location = data[0].formattedAddress;
    //let newResource = {name: name, image: image, caption: caption, author:author, location: location, lat: lat, lng: lng};
    //// Create a new resource and save to DB
    //Resource.create(newResource, function(err, freshResource){
        //if(err){
            //console.log(err);
        //} else {
            //console.log(freshResource);
            //res.redirect("/resources");
        //}
    //});
  //});
//});


//Comment for maps to work ============
//CRUD CREATE via POST to /resources
router.post("/",middleware.isLoggedIn, function (req, res) {
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
      console.log(freshResource);
      res.redirect("/resources");
    }
  });
});


//NEW Form that will help send the POST  to /resources 
router.get("/new", middleware.isLoggedIn,  function (req, res) {
  res.render("resources/new");
});



// Displays info about each individual resource
router.get("/:id", function (req, res) {
  // find resources with the :id 
  Resource.findById(req.params.id).populate("comments").exec(function(err, foundResource){
    if(err){
      console.log(err);
    } else {
      console.log(foundResource);
      // render the display ejs
      res.render("resources/display", {resource: foundResource});
    }
  });

});

//Edit RESOURCE form

router.get("/:id/edit", middleware.checkResourceOwnership, function (req, res) {
  Resource.findById(req.params.id, function (err, foundResource){
    res.render("resources/edit",{resource: foundResource});
     
  });
});




//// Uncomment for Maps to work  
//// UPDATE RESOURCE ROUTE
//router.put("/:id", middleware.checkResourceOwnership, function(req, res){
  //geocoder.geocode(req.body.location, function (err, data) {
    //if (err || !data.length) {
      //req.flash('error', 'Invalid address');
      //return res.redirect('back');
    //}
    //req.body.resource.lat = data[0].latitude;
    //req.body.resource.lng = data[0].longitude;
    //req.body.resource.location = data[0].formattedAddress;

    //Resource.findByIdAndUpdate(req.params.id, req.body.resource, function(err, resource){
        //if(err){
            //req.flash("error", err.message);
            //res.redirect("back");
        //} else {
            //req.flash("success","Updated!");
            //res.redirect("/resources/" + resource._id);
        //}
    //});
  //});
//});





//COMMENT FOR MAPS TO WORK 
//Update  for edit RESOURCE form
router.put("/:id", middleware.checkResourceOwnership, function(req,res) {
  Resource.findByIdAndUpdate(req.params.id, req.body.resource, function (err, updatedResource) {
   if(err){
     res.redirect("/resources");
   } else {
     res.redirect("/resources/" + req.params.id);
   }
  });
});

//DESTORY RESOURCE ROUTE
router.delete("/:id", middleware.checkResourceOwnership, function (req, res) {
  Resource.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/resources");
    } else {
      res.redirect("/resources");
    }
  });
});




//// check if user is logged in 
//function isLoggedIn(req, res, next) {
  //if(req.isAuthenticated()){
    //return next();
  //}
  //res.redirect("/login");
//}

module.exports = router;


