// app config ===================================
const express = require("express");
const app = express();
const passport = require("passport");
let MongoClient = require("mongoose");
const bb = require("express-busboy");
bb.extend(app, {
  upload: true,
  path: "./client/public/uploads/",
  allowedPath: /./
});

// db config ====================================
MongoClient.connect("mongodb://localhost/postIt", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// config apis ==================================
const users = require("./api/users");
const posts = require("./api/posts");
const profile = require("./api/profile");

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use(passport.initialize());
require("./config/passport")(passport);

// routes =======================================
app.get("/", (req, res) => res.send("Hello all possible worlds!"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on ${port}`));
