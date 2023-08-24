const express = require('express');
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.patch('/users/me', updateProfile);
userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me/avatar', updateAvatar);
module.exports = userRouter;
