const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "User"
  },

  karma: {
    type: Number,
    default: 0
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
    required: false,
    filename: {
      type: String
    },
    id: {
      type: String
    }
  },

  metadata: {
    type: Object,
    default: undefined,
    required: false
  },

  avatar: {
    type: String
  },

  type: {
    type: String,
    required: true
  },

  community: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Community"
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
