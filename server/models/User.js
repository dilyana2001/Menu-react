const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 20,
    required: true,
  },
  password: {
    type: String,
    maxlength: 20,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
