const mongoose = require("mongoose");

const Community = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },

  img: {
    type: String,
    required: false
  },

  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],

  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post"
    }
  ]
});

module.exports = mongoose.model("Community", Community);
