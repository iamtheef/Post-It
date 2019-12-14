const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  upvotes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
      }
    }
  ],

  downvotes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
      }
    }
  ],

  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
      },
      username: {
        type: String,
        required: true
      },

      date: {
        type: Date,
        default: Date.now
      },
      body: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("Post", Post);
