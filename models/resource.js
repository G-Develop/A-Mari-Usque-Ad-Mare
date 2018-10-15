const mongoose  = require("mongoose");

//===========SETTING UP THE SCHEMA FOR MONGO========
let resourceSchema = new mongoose.Schema({
  name: String,
  image: String
});

module.exports = mongoose.model("Resource", resourceSchema);
