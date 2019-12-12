const mongoose = require("mongoose");
const profSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  upvoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  downvoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  hidden: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  username: { type: String },
  avatar: { type: String, default: null },
  cover: { type: String, default: null },
  age: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profSchema);
