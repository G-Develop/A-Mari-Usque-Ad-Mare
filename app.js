const express = require("express");
const app = express();
const PORT = 3001;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("landing");
});


app.get("/resources", function (req, res) {
  let resources = [
    {name: "seed name 1", image: "https://images.unsplash.com/photo-1533569346453-2d5258ffdd87?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b95cbe468180d680b04b0727f22738dc&auto=format&fit=crop&w=400&q=60"},
    {name: "seed name 2", image: " https://images.unsplash.com/photo-1533560954233-eaed97b72d1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=943a4d6678b3d0f235cbf0b1ddfd30c0&auto=format&fit=crop&w=400&q=60"},
    {name: "seed name 3", image: " https://images.unsplash.com/photo-1533557068012-cd53d5ecbb0f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d442568190b51943f4ba73d368f011b3&auto=format&fit=crop&w=400&q=60"},
    {name: "seed name 4", image: " https://images.unsplash.com/photo-1536347233915-773803fcb763?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ccdccacc6c16db97c2ecf7392b990364&auto=format&fit=crop&w=400&q=60"}
  ] 
  res.render("resources", {resources:resources});
});




app.listen(PORT,'0.0.0.0', 'localhost', function () {
  console.log(`App.js Server Online listening on localhost ${PORT}`)
}); 


