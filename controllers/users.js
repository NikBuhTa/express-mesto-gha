const User = require('../models/users');
const { hdlError, mkError } = require('../utils/utils');

const getUsers = (req,res) => {
  User.find()
    .orFail(() => {mkError('Users not found')})
    .then(users => res.status(200).send({ data: users }))
    .catch(err => {hdlError(res, err, 'Users not found')});
}

const getUser = (req,res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {mkError('User not found')})
    .then(user => res.status(200).send({ data: user }))
    .catch(err => {
      if (err.name == 'ValidationError'){
        const message = Object.values(err.errors).map(error => error.message).join('; ');
        res.status(400).send({message});
      } else {
        hdlError(res, err, 'User not found');
      }
    });
}

const createUser =(req,res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(err => {
      if (err.name == 'ValidationError'){
        const message = Object.values(err.errors).map(error => error.message).join('; ');
        res.status(400).send({message});
      } else {
        res.send({message: err.message})
      }
    });
}

const updPrf = (req, res) => {
  const {name, about} = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, {name, about}, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {mkError('User not found')})
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name == 'ValidationError'){
        const message = Object.values(err.errors).map(error => error.message).join('; ');
        res.status(400).send({message});
      } else {
        hdlError(res, err, 'User not found');
      }
    });
}

const updAvatar = (req, res) => {
  const {avatar} = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, {avatar}, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {mkError('User not found')})
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name == 'ValidationError'){
        const message = Object.values(err.errors).map(error => error.message).join('; ');
        res.status(400).send({message});
      } else {
        hdlError(res, err, 'User not found');
    }});
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updPrf,
  updAvatar,
}