const express = require('express');
const booksController = require('../controllers/booksController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router
  .get('/', booksController.getAllBooks)
  .get('/:id', booksController.getBook)
  .get('/name/:name', booksController.getBookName)
  .get('/:id/detail', booksController.getBookDetail)
  .post('/', booksController.addBook)
  .put('/:id', booksController.updateBook)
  .delete('/:id', booksController.deleteBook);

module.exports = (app) => app.use('/books', router);
