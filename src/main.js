const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/userRoute')(app);
require('./routes/booksRoute')(app);
require('./routes/genresRoute')(app);

app.get('/', (req, res) => res.send({ msg: 'API running', port: 3000 }));

app.listen(3000, () => console.log('msg: API running | port: 3000'));
