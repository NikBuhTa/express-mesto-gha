const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const routes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '6460c2bf9182b5dd74461034',
  };

  next();
});
app.use(routes);

app.listen(3000, () => {
  console.log('Server is up, PORT => ', PORT);
});
