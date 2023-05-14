const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This input must be filled'],
    minlength: [2, 'Minlength is 2 characters'],
    maxlength: [30, 'Maxlength is 30 characters'],
  },
  about: {
    type: String,
    required: [true, 'This input must be filled'],
    minlength: [2, 'Minlength is 2 characters'],
    maxlength: [30, 'Maxlength is 30 characters'],
  },
  avatar: {
    type: String,
    required: [true, 'This input must be filled'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
