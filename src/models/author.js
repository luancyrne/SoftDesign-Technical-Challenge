const mongoose = require('../database');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    select: false,
    default: Date.now,
  },
});

const Authors = mongoose.model('Authors', AuthorSchema);

module.exports = Authors;
