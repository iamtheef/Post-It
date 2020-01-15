const express = require("express");
const router = express.Router();
const passport = require("passport");

// Models ===========================================

const Profile = require("../models/Profile");
const User = require("../models/User");

// Routes ===========================================

// View Profile (Private)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findById(req.user.profile)
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No profile was found";
          return res.status(404).json({ errors });
        } else {
          res.json(profile);
        }
      })
      .catch(e => res.status(404).json(e));
  }
);

// Update Profile (Posts/Cover)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let fields = {};

    if (req.body.posts) fields.posts = req.body.posts;
    if (req.body.upvoted) fields.upvoted = req.body.upvoted;
    if (req.body.downvoted) fields.downvoted = req.body.downvoted;
    if (req.body.hidden) fields.hidden = req.body.hidden;
    if (req.body.cover) fields.cover = req.body.cover;
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: fields },
      { new: true }
    )
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
);

// Public profiles (By Id)
router.get("/:user_id", (req, res) => {
  User.findById({ _id: req.params.user_id })
    .populate("user", [
      "username",
      "avatar",
      "upvoted",
      "downvoted",
      "hidden",
      "posts"
    ])
    .then(profile => {
      if (!profile) res.status(404).json("Empty profile");
      res.json(profile);
    })
    .catch(e => res.json({ e: "No profiles found" }));
});

module.exports = router;
