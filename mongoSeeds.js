const mongoose = require("mongoose");
const Resource = require("./models/resource");
const Comment  = require("./models/comment");

let data = [
  {
    name: "Drunk Feminist Films: I Know What You Did Last Summer", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/03/5120d652-1871-41ce-b5b9-3bea2f6a5db6.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "this is the first event",
    username:"Lornezo"
  },
  {
    name: "Canadian Horror Story ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/13/6621f3db-5713-4de9-b3ff-4216050545be.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "GNU plus linux",
    username:"Lornezo"
  },
  {
    name: "Ontario Museum Association Annual Conference 2018", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/08/22/c85fc216-9532-4246-80c0-7da68b751408.png-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.png",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "Food for Action", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/15/a0166875-5578-4a09-9012-f7867bcaefd0.png-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.png",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "Japanese Problem-Young Centre for the Performing Arts", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/08/24/2f8af98a-9c0d-4d00-8049-e55ffd0f998a.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "House of Kings: Hallo-Haunt! ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/15/4b20220f-c426-44c8-8819-4c8a455e5033.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "NIGHT SHIFT // 154 // Fawn Big Canoe x Faetal ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/21/original_image4ee76b30-57d5-43c2-a365-64c2af5786de.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "3/Edition Art Book Fair ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/22/original_image58e40f0d-d918-40c4-a272-da952d9addd3.png-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.png",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "12 Bar Blues School of Guitar ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/19/original_image3be3ca72-9dbf-4fdf-b8c5-08b1495a2bd8.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "Dark Waters ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/09/19/98bcb97a-b484-4865-b3e3-2e80308bcaa6.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "Opening Act Dan Rosen ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/10/11/64880a24-34ac-4969-84cd-374bac2562a2.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },
  {
    name: "The Loryn Taggart Band & Friends ", 
    image: "https://s3.amazonaws.com/btoimage/prism-thumbnails/events/2018/09/20/f4d877b7-3739-4f3b-8947-b5735725c4da.jpg-resize-_opacity_100-frame_bg_color_FFF-gravity_center-q_70-preserve_ratio_true-w_2048_.jpg",
    caption: "hello world",
    username:"Lornezo"
  },


]

function seedDB(){ 
  Resource.remove({}, function(err) { 
    if (err){
    console.log(err); 
  } 
  console.log("removed resources!");
    //seed  the  resources here
    data.forEach(function(seed){
      Resource.create(seed, function(err, resource) {
        if(err) {
          console.log(err);
        } else {
          console.log("resource successfully added");
          //add comments
          Comment.create(
            {
             text:"archlinux with vim :d",
             author:"stallman"
            }, function(err, comment) {
              if(err) {
                console.log(err);
              }else {
                resource.comments.push(comment);
                resource.save();
                console.log("new comment created");
              }
              
            }
          );
        }
        
      });
    });
  });
}

module.exports = seedDB;

