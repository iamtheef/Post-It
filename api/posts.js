const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validatePost = require("../validation/post");
const validateComment = require("../validation/comment");
const Community = require("../models/Community");
const Comment = require("../models/Comment");
const ObjectId = require("mongoose").Types.ObjectId;
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

    // filling new post accordingly
    const makePost = new Promise(resolve => {
      switch (body.type) {
        case "textPost":
          newPost.body = body.body;
          return resolve(newPost);

        case "mediaPost":
          newPost.file = {
            filename: req.files.file.filename,
            id: req.files.file.uuid
          };
          return resolve(newPost);

        case "linkPost":
          const options = { url: body.link };
          ogs(options).then(results => {
            newPost.metadata = results.data;
            return resolve(newPost);
          });
      }
    });

    // saving
    Promise.all([
      Profile.findOne({ _id: req.user.profile }),
      makePost.then(post => post.save()),
      Community.findById(body.community)
    ])
      .then(([user, post, community]) => {
        user.posts.push(post._id);
        user.save();
        community.posts.push(post._id);
        community.save();
        res.json(post.populate("user").populate("community"));
      })
      .catch(e => res.json(e));
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
  Post.findById(new ObjectId(req.params.post_id))
    .populate("community")
    .populate("user")
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
    Promise.all([
      Profile.findOne({ user: req.user._id }).populate("user"),
      Post.findById(req.params.post_id).populate("post")
    ])
      .then(([user, post]) => {
        if (user.upvoted.includes(post._id)) {
          user.upvoted.splice(user.upvoted.indexOf(post._id), 1);
          user.save();
          post.upvotes.splice(post.upvotes.indexOf(user._id), 1);
          post.karma = post.upvotes.length - post.downvotes.length;
          post.save();
          res.json(user.upvoted);
        } else {
          if (user.downvoted.includes(post._id)) {
            user.downvoted.splice(user.downvoted.indexOf(post._id), 1);
          }
          user.upvoted.push(post._id);
          user.save();
          post.upvotes.push(user._id);
          post.karma = post.upvotes.length - post.downvotes.length;
          post.save();
          res.json(user.upvoted);
        }
      })
      .catch(e => res.json(e));
  }
);

// Downvote/revoke downvote post
router.post(
  "/:post_id/downvote",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Promise.all([
      Profile.findOne({ user: req.user._id }).populate("user"),
      Post.findById(req.params.post_id).populate("post")
    ])
      .then(([user, post]) => {
        if (user.downvoted.includes(post._id)) {
          user.downvoted.splice(user.downvoted.indexOf(post._id), 1);
          user.save();
          post.downvotes.splice(post.downvotes.indexOf(user._id), 1);
          post.karma = post.upvotes.length - post.downvotes.length;
          post.save();
          res.json(user.downvoted);
        } else {
          if (user.upvoted.includes(post._id)) {
            user.upvoted.splice(user.upvoted.indexOf(post._id), 1);
          }
          user.downvoted.push(post._id);
          user.save();
          post.downvotes.push(user._id);
          post.karma = post.upvotes.length - post.downvotes.length;
          post.save();
          res.json(user.downvoted);
        }
      })
      .catch(e => res.json(e));
  }
);

// Add comment to post
router.post(
  "/:post_id/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newComment = new Comment({
      username: req.user.username,
      body: req.body.body,
      children: []
    });

    Post.findById(req.params.post_id)
      .then(post => {
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post.comments));
      })
      .catch(e => res.json(e));
  }
);
//children comment (reply)
router.post(
  "/:post_id/:comm_id/reply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateComment(req.body);
    if (!isValid) return res.status(400).json(errors);

    Comment.findById(req.params.comm_id)
      .then(comment => {
        const newComment = new Comment({
          username: req.user.username,
          body: req.body.body,
          children: []
        });
        comment.children.unshift(newComment);
        comment.save().then(comment => res.json(comment));
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
