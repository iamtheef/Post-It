const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Models

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Routes

router.get("/test", (req, res) => res.json({ msg: "profile works!" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No profile for this user was found";
          return res.status(404).json({ errors });
        } else {
          res.json(profile);
        }
      })
      .catch(e => res.status(404).json(e));
  }
);

module.exports = router;
