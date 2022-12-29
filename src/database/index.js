const mongoose = require('mongoose');

require('dotenv');

mongoose.connect(MONGO_HOST, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;