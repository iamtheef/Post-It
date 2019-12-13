const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const validatePost = require("../../validation/post");

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      body: req.body.body,
      avatar: req.user.avatar,
      likes: [],
      comments: []
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// All posts
router.get("/all", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(e => res.json(e));
});

// A specific post
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      res.json(post);
    })
    .catch(e => res.status(404).json(e));
});

// Delete post
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ Error: "User not authorized" });
          }

          post
            .remove()
            .then(() => res.json({ postDeleted: "Post deleted succesfully" }));
        })
        .catch(res.status(404).json({ notFound: "Post not found" }));
    });
  }
);

// Upvote/revoke upvote post
router.post(
  "/:post_id/upvote",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (!post.upvotes.includes(req.user.id)) {
              post.upvotes.push(req.user.id);
              post.save().then(post => res.json(post));
            } else {
              let removeIndex = post.upvotes.indexOf(req.user.id);
              post.upvotes.splice(removeIndex, 1);
              post.save().then(post => res.json(post));
            }
          })
          .catch(res.status(404).json({ notFound: "Post not found" }));
      })
      .catch(e =>
        res
          .status(401)
          .json({ unathorized: "You are unauthorized for this action" })
      );
  }
);

module.exports = router;
