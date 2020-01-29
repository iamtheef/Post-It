const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },

  children: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      required: false
    }
  ]
});

module.exports = mongoose.model("Comment", Comment);
