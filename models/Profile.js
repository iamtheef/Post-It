const mongoose = require("mongoose");
const profSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  upvoted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  downvoted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

  hidden: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  username: { type: String },
  avatar: { type: String, default: null },
  cover: { type: String, default: null },
  age: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profSchema);
