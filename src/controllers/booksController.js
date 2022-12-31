const Books = require('../models/books');
const Genres = require('../models/genres');

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Books.find({}, 'img title author genre publisher inStock rented');
      return res.send({ books });
    } catch (error) {
      return res.send({ error: 'Error loading bookshelf' });
    }
  },
  getBook: async (req, res) => {
    try {
      const book = await Books.findById(req.params.id, 'img title author genre publisher rented');
      return res.send({ book });
    } catch (error) {
      return res.status(400).send({ erro: 'Error when searching book on shelf' });
    }
  },
  getBookName: async (req, res) => {
    const { name } = req.params;
    try {
      const book = await Books.find({ title: { $regex: `${name}` } });
      return res.send({ book });
    } catch (error) {
      return res.status(404).send({ error: 'Could not find the book with this name' });
    }
  },
  getBookDetail: async (req, res) => {
    try {
      const book = await Books.findById(req.params.id);
      return res.send({ book });
    } catch (error) {
      return res.status(400).send({ erro: 'Error when searching book on shelf' });
    }
  },
  addBook: async (req, res) => {
    const genre = req.body;
    try {
      if (!await Genres.findOne({ name: genre.genre })) {
        return res.status(400).send({ error: 'No gender defined or no gender registered' });
      }
      await Books.create(req.body);
      return res.send({ msg: 'Book successfully added' });
    } catch (err) {
      return res.status(422).send({ error: 'More information about the book needed' });
    }
  },
  updateBook: async (req, res) => {
    try {
      const { rented } = await Books.findById(req.params.id, 'rented');
      if (rented) {
        return res.status(400).send({ error: 'It is not possible to edit this book because it is rented' });
      }
      await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.send({ msg: 'Updated book' });
    } catch (err) {
      return res.status(422).send({ error: 'Unable to update book' });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const { rented } = await Books.findById(req.params.id, 'rented');
      if (rented) {
        return res.status(400).send({ error: 'Could not delete this book because it is rented' });
      }
      await Books.findByIdAndRemove(req.params.id);
      return res.send({ msg: 'Deleted book' });
    } catch (error) {
      return res.status(400).send({ erro: 'Unable to delete this book' });
    }
  },
};
