const express = require('express');
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);
module.exports = userRouter;
