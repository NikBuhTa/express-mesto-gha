const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const {userRouter, cardRouter} = require('./routes');

const app = express();


mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '645d260e1e95ba292de6eb05'
  };

  next();
})
app.use(userRouter);
app.use(cardRouter);
app.use((req, res) => {res.status(404).send({message: 'Not found'})})

app.listen(3000, () => {
  console.log('Server is up, PORT => ', PORT);
})