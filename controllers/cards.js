const Card = require('../models/cards');
const { makeError, handleError } = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .orFail(() => { makeError('Cards not found'); })
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => { handleError(res, err, 'Cards not found'); });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({
    name,
    link,
    owner: id,
  })
    .then((card) => card.populate(['owner']))
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        res.status(400).send({ message });
      }
      res.status(500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId, { new: true })
    .orFail(() => { makeError('Card not found'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        handleError(res, err, 'Card not found');
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => { makeError('Card not found'); })
    .populate(['owner', 'likes'])
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        handleError(res, err, 'Card not found');
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => { makeError('Card not found'); })
    .populate(['owner', 'likes'])
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        handleError(res, err, 'Card not found');
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
