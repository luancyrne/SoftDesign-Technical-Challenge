const Genres = require('../models/genres');
const Books = require('../models/books');

module.exports = {
  getAllGenres: async (req, res) => {
    try {
      const genres = await Genres.find({}, 'name');
      return res.send({ genres });
    } catch (err) {
      return res.send({ error: 'Error loading bookshelf' });
    }
  },
  getGenreName: async (req, res) => {
    const { name } = req.params;
    try {
      const genre = await Genres.find({ name: { $regex: `${name}` } }, 'name');
      return res.send({ genre });
    } catch (err) {
      return res.send({ error: 'Error finding genre' });
    }
  },
  getBooksGenre: async (req, res) => {
    try {
      const genre = await Genres.findById(req.params.id, 'name');
      const books = await Books.find({ genre: genre.name });
      return res.send({ books });
    } catch (err) {
      return res.send({ error: 'Error finding genre' });
    }
  },
  addGenre: async (req, res) => {
    const { name } = req.body;

    try {
      if (await Genres.findOne({ name })) {
        return res.status(400).send({ error: 'Genre already exists or incorrect information' });
      }

      const genreName = await Genres.create(req.body);

      return res.send({ genreName });
    } catch (err) {
      return res.status(422).send({ error: 'Genre registration failed' });
    }
  },
  deleteGenre: async (req, res) => {
    try {
      await Genres.findByIdAndRemove(req.params.id);
      return res.send({ msg: 'Deleted genre' });
    } catch (err) {
      return res.status(400).send({ error: 'Failed to delete genre' });
    }
  },
};
