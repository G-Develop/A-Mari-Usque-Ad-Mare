const express = require("express");
const app = express();
const PORT = 3001;
const bodyParser  = require("body-parser");
const mongoose  = require("mongoose");
const Resource = require("./models/resource");
const seedDB = require("./mongoSeeds");


seedDB();

mongoose.connect("mongodb://localhost/resources");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


/*
  Resource.create(
    {
      name: "seed name 3", image: "https://images.unsplash.com/photo-1533557068012-cd53d5ecbb0f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d442568190b51943f4ba73d368f011b3&auto=format&fit=crop&w=400&q=60"
    }, function(err, resource) {
      if (err){
        console.log(err);
      } else {
        console.log("newly created Resource: ");
        console.log(resource);
      }
    });
*/



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


app.get("/resources", function (req, res) {
  console.log("user has hit the resources route");
  //get all resources from the DB
  Resource.find({}, function (err, allResources){
    if(err){
      console.log(err);
    } else {
      res.render("resources", {resources:allResources});
    }
  });
});






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



app.get("/resources/new", function (req, res) {
  console.log("user has hit the resources/new get  route");
  res.render("new.ejs");
});




app.listen(PORT,'0.0.0.0', 'localhost', function () {
  console.log(`App.js Server Online listening on localhost ${PORT}`)
}); 


