const Authors = require('../models/author');
const Books = require('../models/books');

module.exports = {
  getAllAuthor: async (req, res) => {
    try {
      const authors = await Authors.find({}, 'name');
      return res.send({ authors });
    } catch (err) {
      return res.send({ error: 'Error loading authors' });
    }
  },
  getAuthorName: async (req, res) => {
    const { name } = req.params;
    try {
      const author = await Authors.find({ name: { $regex: `${name}` } }, 'name');
      return res.send({ author });
    } catch (err) {
      return res.send({ error: 'Error finding author' });
    }
  },
  getBooksAuthor: async (req, res) => {
    try {
      const author = await Authors.findById(req.params.id, 'name');
      const books = await Books.find({ author: author.name });
      return res.send({ books });
    } catch (err) {
      return res.send({ error: 'Error finding books' });
    }
  },
  addAuthor: async (req, res) => {
    const { name } = req.body;

    try {
      if (await Authors.findOne({ name })) {
        return res.status(400).send({ error: 'Author already exists' });
      }

      const authorName = await Authors.create(req.body);

      return res.send({ authorName });
    } catch (err) {
      return res.status(422).send({ error: 'Author registration failed' });
    }
  },
  updateAuthor: async (req, res) => {
    const { name } = req.body;
    try {
      if (await Authors.findOne({ name })) {
        return res.status(400).send({ error: 'Author already exists' });
      }

      await Authors.findByIdAndUpdate(req.params.id, { name });
      return res.send({ msg: 'Updated author' });
    } catch (err) {
      return res.status(400).send({ error: 'Failed to updated author' });
    }
  },
  deleteAuthor: async (req, res) => {
    try {
      await Authors.findByIdAndRemove(req.params.id);
      return res.send({ msg: 'Deleted author' });
    } catch (err) {
      return res.status(400).send({ error: 'Failed to delete author' });
    }
  },
};
