const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const routes = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(routes);

app.listen(3000, () => {
  console.log('Server is up, PORT => ', PORT);
});
