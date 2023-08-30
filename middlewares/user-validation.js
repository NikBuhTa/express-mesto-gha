const { Joi, celebrate } = require('celebrate');
const { RegExp } = require('../utils/constants');

const loginValidator = (next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
  next();
};

const registrationValidator = (next) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(RegExp),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
  next();
};

const updateUserInfoValidator = (next) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  });
  next();
};

const updateAvatarValidator = (next) => {
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(RegExp),
    }),
  });
  next();
};

const userIdValidator = (next) => {
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  });
  next();
};

module.exports = {
  loginValidator,
  registrationValidator,
  updateUserInfoValidator,
  updateAvatarValidator,
  userIdValidator,
};
