const mongoose  = require("mongoose");

//===========SETTING UP THE SCHEMA FOR MONGO========
let resourceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ] 
});

module.exports = mongoose.model("Resource", resourceSchema);
