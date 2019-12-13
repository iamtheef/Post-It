const mongoose = require("mongoose");
const profSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  ],

  upvoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  ],

  downvoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  ],

  hidden: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  ],

  cover: { type: String, default: null },
  age: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profSchema);
