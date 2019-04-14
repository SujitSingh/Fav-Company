const mongoose = require('mongoose');

// Schema for user table
const userSchema = mongoose.Schema({
  userName: { type: String, require: true },
  email: { type: String, require, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);