const User = require('../models/users');
const { handleError, makeError } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find()
    .orFail(() => { makeError('Users not found'); })
    .then((users) => res.send({ data: users }))
    .catch((err) => { handleError(res, err, 'Users not found'); });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        res.status(400).send({ message });
      } else {
        res.send({ message: err.message });
      }
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
