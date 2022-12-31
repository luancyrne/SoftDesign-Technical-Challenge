const mongoose = require('../database');

const BooksSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
  rented: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    select: false,
    default: Date.now,
  },
});

const Books = mongoose.model('Books', BooksSchema);

module.exports = Books;
