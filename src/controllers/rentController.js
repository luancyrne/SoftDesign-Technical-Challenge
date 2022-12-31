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
};
