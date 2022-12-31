const express = require('express');
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router
  .get('/', authorController.getAllAuthor)
  .get('/name/:name', authorController.getAuthorName)
  .get('/:id', authorController.getBooksAuthor)
  .post('/', authorController.addAuthor)
  .delete('/:id', authorController.deleteAuthor)
  .put('/:id', authorController.updateAuthor);

module.exports = (app) => app.use('/authors', router);
