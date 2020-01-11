const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validatePost = require("../validation/post");
const validateComment = require("../validation/comment");
const Community = require("../models/Community");

const ogs = require("open-graph-scraper");

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //extracting data from the form
    const body = JSON.parse(req.body.data);

    //validation
    const { errors, isValid } = validatePost(req);
    if (!isValid) return res.status(400).json(errors);

    // saving function
    const savePost = newPost => {
      newPost
        .save()
        .then(post => {
          Community.findOne({ _id: body.community }).then(community => {
            community.posts.push(newPost._id);
          });
          res.json(post.populate("user").populate("community"));
        })
        .catch(e => res.json(e));
    };

    // creating object
    const newPost = new Post({
      user: req.user._id,
      title: body.title,
      type: body.type,
      community: body.community,
      upvotes: [],
      downvotes: [],
      comments: []
    });

    switch (body.type) {
      case "textPost":
        newPost.body = body.body;
        savePost(newPost);
        break;
      case "mediaPost":
        newPost.file = {
          filename: req.files.file.filename,
          id: req.files.file.uuid
        };
        savePost(newPost);
        break;
      case "linkPost":
        const options = { url: body.link };
        ogs(options)
          .then(results => {
            newPost.metadata = results.data;
            savePost(newPost);
          })
          .catch(error => {
            newPost.metadata.error = error;
            savePost(newPost);
          });
        break;
    }
  }
);

// All posts
router.get("/all", (req, res) => {
  Post.find({})
    .populate("community")
    .populate("user")
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
    .populate("Community")
    .then(communities => res.json(communities))
    .catch(e => res.json(e.response.data));
});

// Communities by id
router.get("/communities/:id", (req, res) => {
  Community.findOne({ _id: req.params.id })
    .then(community => res.json(community))
    .catch(e => res.json(e.response.data));
});

module.exports = router;
