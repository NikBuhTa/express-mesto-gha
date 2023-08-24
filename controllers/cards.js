const { NotFoundError } = require('../errors/not-found-error');
const Card = require('../models/cards');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => { throw new NotFoundError('Карточки не найдены'); })
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({
    name,
    link,
    owner: id,
  })
    .then((card) => card.populate(['owner']))
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndRemove(_id, { new: true })
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
