const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
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
        ref: "User"
      }
    }
  ],

  downvotes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    }
  ],

  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
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

module.exports = mongoose.model("Post", Post);
