const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const routes = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/error-handler');
const { registrationValidator, loginValidator } = require('./middlewares/user-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', registrationValidator, createUser);

app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleErrors(err, req, res, next);
});

app.listen(3000, () => {
  console.log('Server is up, PORT => ', PORT);
});
