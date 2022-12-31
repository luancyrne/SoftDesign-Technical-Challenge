const mongoose = require('../database');

const GenresSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  createdAt: {
    type: Date,
    select: false,
    default: Date.now,
  },
});

const Genres = mongoose.model('Genres', GenresSchema);

module.exports = Genres;
