const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { secretKey } = require('../utils/utils');
const NotFoundError = require('../errors/not-found-error');
const InvalidDataError = require('../errors/invalid-data-error');

const getUsers = (req, res, next) => {
  User.find()
    .orFail(() => { throw new NotFoundError('Пользователи не найдены'); })
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name = undefined, about = undefined, avatar = undefined, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send({ data: user }))
        .catch(next);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      return res.cookie('jwt', `${token}`, {
        httpOnly: true,
      }).end();
    }
    throw new InvalidDataError('Неправильный логин или пароль');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
