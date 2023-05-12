const {getUsers, getUser, createUser, updPrf, updAvatar} = require('../controllers/users');
const express = require('express');
const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updPrf);
userRouter.patch('/users/me/avatar', updAvatar);
module.exports = userRouter;