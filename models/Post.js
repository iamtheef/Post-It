const mongoose = require("mongoose");

const Post = new mongoose.Schema({
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
    required: false,
    default: undefined
  },

  file: {
    type: String,
    required: false,
    default: undefined
  },

  link: {
    type: String,
    required: false,
    default: undefined
  },

  avatar: {
    type: String
  },

  type: {
    type: String,
    required: true
  },

  community: {
    type: String,
    required: true
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
        type: String,
        default: ""
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", Post);
