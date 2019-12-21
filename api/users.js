const express = require("express");
const User = require("../models/User");
const Profile = require("../models/Profile");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const ValidateLogin = require("../validation/login");
const ValidateRegister = require("../validation/register");

//routes ===================================

router.post("/register", (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(400).json({ email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
        });

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          avatar,
          password: req.body.password,
          profile: new Profile()
        });

        let hash = bcrypt.hashSync(req.body.password, 12);
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(e => console.log(e));
      }
    })
    .catch(e => res.json(e));
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const { errors, isValid } = ValidateLogin(req.body);
  if (!isValid) {
    return res.json(errors);
  }

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

module.exports = router;