const mongoose = require('mongoose');

const bookScheme = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  author: {
    type: String,
    required: true,

    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: '',
  },
  pages: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },

  publish: {
    type: Date,
    default: Date.now,
  },
});

const bookTable = new mongoose.model('book', bookScheme);
module.exports = bookTable;
