const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Books = require('../models/books');

module.exports = {
  rentBook: async (req, res) => {
    const bearer = req.headers.authorization;
    const token = await bearer.replace('Bearer ', '');
    const { id } = await jwt.decode(token);

    try {
      const { rented, title } = await Books.findById({ _id: req.params.id }, 'rented title');
      if (rented) {
        return res.status(400).send({ error: 'Book unavailable' });
      }
      await Books.findByIdAndUpdate({ _id: req.params.id }, { rented: true });
      const { rentedBooks } = await User.findById(id);
      const currentBooks = [];
      await Promise.all(rentedBooks.map((book) => {
        currentBooks.push(book);
        return null;
      }));

      await currentBooks.push({ _id: req.params.id, title, date: Date.now });

      await User.findByIdAndUpdate(id, { rentedBooks: currentBooks });
      return res.send({ msg: 'Book rented on your user' });
    } catch (err) {
      return res.status(400).send({ error: 'Unable to rent the book' });
    }
  },
  rentedBooks: async (req, res) => {
    const bearer = req.headers.authorization;
    const token = await bearer.replace('Bearer ', '');
    const { id } = await jwt.decode(token);

    try {
      const { rentedBooks } = await User.findById(id);
      return res.send(rentedBooks);
    } catch (err) {
      return res.status(400).send({ error: 'Failed to load your books' });
    }
  },
  returnBook: async (req, res) => {
    const bearer = req.headers.authorization;
    const token = await bearer.replace('Bearer ', '');
    const { id } = await jwt.decode(token);
    const { rentedBooks } = await User.findById(id, 'rentedBooks');
    const newBooks = rentedBooks;
    // eslint-disable-next-line no-underscore-dangle
    const book = rentedBooks.find((books) => books._id === req.params.id);

    try {
      if (book) {
        await Books.findByIdAndUpdate(req.params.id, { rented: false });
        let indexBook = null;
        await Promise.all(rentedBooks.map((books, index) => {
          // eslint-disable-next-line no-underscore-dangle
          if (books._id === req.params.id) {
            indexBook = index;
          }
          return null;
        }));

        newBooks.splice(indexBook);

        await User.findByIdAndUpdate(id, { rentedBooks: newBooks });

        return res.send({ msg: 'Book returned to shelf' });
      }

      return res.status(400).send({ error: 'You don`t have this book rented' });
    } catch (err) {
      return res.status('400').send({ error: 'Unable to return book' });
    }
  },
};
