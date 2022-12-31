const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .post('/authenticate', authController.login)
  .post('/register', authController.register);

module.exports = (app) => app.use('/auth', router);
