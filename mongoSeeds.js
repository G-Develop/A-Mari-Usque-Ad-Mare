const mongoose  = require("mongoose");
const Resource = require("./models/resource");

let data = [
  {
    name: "seed name 1", 
    image: "https://images.unsplash.com/photo-1533569346453-2d5258ffdd87?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b95cbe468180d680b04b0727f22738dc&auto=format&fit=crop&w=400&q=60",
    description: "lorem ipsum"
  },
  {
    name: "seed name 2", 
    image: "https://images.unsplash.com/photo-1533569346453-2d5258ffdd87?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b95cbe468180d680b04b0727f22738dc&auto=format&fit=crop&w=400&q=60",
    description: "GNU plus linux"
  },
  {
    name: "seed name 3", 
    image: "https://images.unsplash.com/photo-1533569346453-2d5258ffdd87?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b95cbe468180d680b04b0727f22738dc&auto=format&fit=crop&w=400&q=60",
    description: "hello world"
  }
]

function seedDB(){ 
  Resource.remove({}, function(err) { 
    if (err){
    console.log(err); 
  } 
  console.log("removed resources!");
    //seed  the  resources here
    data.forEach(function(seed){
      Resource.create(seed, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log("resource successfully added");
        }
        
      });
    });
});
  
  //add comments
}

module.exports = seedDB;

