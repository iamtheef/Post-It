const mongoose = require("mongoose");
const Profile = require("./Profile");

//Creating Schema
const UserSchema = new mongoose.Schema({
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
    default: "",
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

module.exports = mongoose.model("User", UserSchema);
