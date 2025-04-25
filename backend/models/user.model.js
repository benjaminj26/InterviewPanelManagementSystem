const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String
});

module.exports = mongoose.model('User', userSchema);
