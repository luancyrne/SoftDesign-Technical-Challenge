const express = require('express');
const genresController = require('../controllers/genresController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router
  .get('/', genresController.getAllGenres)
  .get('/name/:name', genresController.getGenreName)
  .get('/:id', genresController.getBooksGenre)
  .post('/', genresController.addGenre)
  .delete('/:id', genresController.deleteGenre);

module.exports = (app) => app.use('/genres', router);
