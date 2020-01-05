const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validatePost = require("../validation/post");
const validateComment = require("../validation/comment");
const Community = require("../models/Community");

router.post(
  "/new",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.files);
    const { errors, isValid } = validatePost(req);
    if (!isValid) return res.status(400).json(errors);
    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      community: req.body.community,
      type: req.body.postType,
      avatar: req.user.avatar,
      upvotes: [],
      downvotes: [],
      comments: []
    });

    switch (req.body.type) {
      case "textPost":
        newPost.body = req.body.body;
        break;
      case "mediaPost":
        const file = req.files.file;
        newPost.file = file;
        file.mv(`${__dirname}/userUploads/${file.name}`, err => {
          if (err) console.error(err);
        });
        break;
      case "linkPost":
        newPost.link = req.body.link;
        break;
      default:
        res.json("No Post found");
    }

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

// Add comment to post
router.post(
  "/:post_id/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateComment(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          username: req.user.username,
          user: req.user.id,
          body: req.body.body,
          avatar: req.user.avatar
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(e => res.json(e));
  }
);

// Remove comment
router.delete(
  "/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        const removeIndex = post.comments.indexOf(req.params.comment_id);
        if (req.user.id === removeIndex.user.id) {
          post.comments.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        } else {
          res.status(401).json({ msg: "Unathorized action" });
        }
      })
      .catch(e => res.json(e));
  }
);

// All communities
router.get("/communities/all", (req, res) => {
  Community.find({})
    .then(communities => res.json(communities))
    .catch(e => res.json(e.response.data));
});

module.exports = router;
