const mongoose = require('mongoose');

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
    // validate:
  },
});

module.exports = mongoose.model('user', userSchema);
