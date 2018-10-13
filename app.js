const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", function (req, res) {
  res.send("root path");
});




app.listen(PORT, "localhost", function () {
  console.log("App.js Server Online")
}); 


