const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
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

  isActive: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  joindate: {
    type: Date,
    default: Date.now,
  },
});

const userTable = new mongoose.model('user', userScheme);
module.exports = userTable;
