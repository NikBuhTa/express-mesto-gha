const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { handleError, makeError, secretKey } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find()
    .orFail(() => { makeError('Users not found'); })
    .then((users) => res.send({ data: users }))
    .catch((err) => { handleError(res, err, 'Users not found'); });
};

const getUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => { makeError('User not found'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        handleError(res, err, 'User not found');
      }
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => res.send({ message: e.message }));
};

const createUser = (req, res) => {
  const {
    name = undefined, about = undefined, avatar = undefined, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((error) => error.message).join('; ');
            res.status(400).send({ message });
          } else {
            res.send({ message: err.message });
          }
        });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => { makeError('User not found'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        res.status(400).send({ message });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        handleError(res, err, 'User not found');
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => { makeError('User not found'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        res.status(400).send({ message });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        handleError(res, err, 'User not found');
      }
    });
};

// eslint-disable-next-line consistent-return
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      return res.cookie('jwt', `${token}`, {
        httpOnly: true,
      }).end();
    }
    throw new Error('Invalid login or password');
  } catch (e) {
    res.send({ message: e.message });
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
