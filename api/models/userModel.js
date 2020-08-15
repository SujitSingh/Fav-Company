const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  creationDate: { type: Date, default: Date.now },
  favCompanies: [{ type: mongoose.Types.ObjectId, ref: 'Company' }]
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;