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
//refactored routes
const commentRoutes  = require("./routes/comments");
const resourceRoutes = require("./routes/resources");
const indexRoutes = require("./routes/index");


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

app.use("/", indexRoutes);
app.use("/resources", resourceRoutes);
app.use("/resources/:id/comments", commentRoutes);



app.listen(PORT,'0.0.0.0', 'localhost', function () {
  console.log(`App.js Server Online listening on localhost ${PORT}`)
}); 


