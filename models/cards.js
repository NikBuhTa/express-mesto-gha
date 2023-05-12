const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This input must be filled'],
    minlength: [2, 'Minlength is 2 characters'],
    maxlength: [30, 'Maxlength is 30 characters']
  },
  link: {
    type: String,
    required: [true, 'This input must be filled'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'This input must be filled'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

});

module.exports = mongoose.model('card', cardSchema);