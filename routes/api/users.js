const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//routes ===================================

router.get("/test", (req, res) => res.json({ message: "users works!" }));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      let hash = bcrypt.hashSync(req.body.password, 12);
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(e => console.log(e));
    }
  });
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "Incorrect email/password" });
    }
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
            } else {
              res.json({ success: true, token: "Bearer " + token });
            }
          }
        );
      } else {
        return res.status(400).json({ msg: "Incorrect email/password" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
