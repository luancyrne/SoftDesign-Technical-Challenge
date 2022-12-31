const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/userRoute')(app);
require('./routes/booksRoute')(app);
require('./routes/genresRoute')(app);
require('./routes/authorsRoute')(app);
require('./routes/rentRoute')(app);

app.get('/', (req, res) => res.send({ msg: 'API running', port: process.env.PORT }));

app.listen(process.env.PORT, () => console.log('msg: API running | port: ', process.env.PORT));
