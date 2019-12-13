const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default: null,
    required: false
  },

  date: {
    type: Date,
    default: Date.now
  },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
});

module.exports = User = mongoose.model("users", UserSchema);
