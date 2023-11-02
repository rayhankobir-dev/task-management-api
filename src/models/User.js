const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  profileImageURL: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    select: false,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
