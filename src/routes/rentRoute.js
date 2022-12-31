const express = require('express');
const authMiddleware = require('../middlewares/auth');
const rentController = require('../controllers/rentController');

const router = express.Router();

router.use(authMiddleware);

router
  .get('/:id', rentController.rentBook)
  .get('/rented/my', rentController.rentedBooks)
  .put('/:id', rentController.returnBook);

module.exports = (app) => app.use('/rent', router);
