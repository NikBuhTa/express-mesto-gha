const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Minlength is 2 characters'],
    maxlength: [30, 'Maxlength is 30 characters'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Minlength is 2 characters'],
    maxlength: [30, 'Maxlength is 30 characters'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validata: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Invalid login or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Invalid login or password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
