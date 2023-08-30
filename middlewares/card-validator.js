const { Joi, celebrate } = require('celebrate');

const addCardValidator = (next) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(RegExp),
    }),
  });
  next();
};

const cardIdValidator = (next) => {
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  });
  next();
};

module.exports = {
  addCardValidator,
  cardIdValidator,
};
