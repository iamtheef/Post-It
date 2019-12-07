// app config ===================================

const express = require("express");
const app = express();
// db config ====================================
let MongoClient = require("mongoose");
MongoClient.connect("mongodb://localhost/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// use routes ===================================

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

// routes =======================================

app.get("/", (req, res) => res.send("Hello all possible worlds!"));

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on ${port}`));
