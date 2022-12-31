const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_HOST);
mongoose.Promise = global.Promise;

module.exports = mongoose;
