const Card = require('../models/cards');
const { mkError, hdlError } = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
  .orFail(() => {mkError('Cards not found')})
  .populate(['owner', 'likes'])
  .then(cards => res.status(201).send({ data: cards }))
  .catch(err => {hdlError(res, err, 'Cards not found')});
}

const createCard = (req, res) => {
  const {name, link} = req.body;
  const id = req.user._id;

  Card.create({
    name,
    link,
    owner: id
  })
  .then(card => card.populate(['owner', 'likes']))
  .then(card => res.status(200).send({data: card}))
  .catch(err => res.status(500).send({message: err.message}));
}

const dltCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
  .orFail(() => {mkError('Wrong cardId or there is no card with such id')})
  .then(card => res.status(200).send({data: card}))
  .catch(err => {hdlError(res, err, 'Wrong cardId or there is no card with such id')})
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id }
    },
    {new: true}
  )
  .orFail(() => {mkError('Wrong cardId')})
  .populate(['owner', 'likes'])
  .then(card => card.populate(['owner', 'likes']))
  .then(card => res.status(200).send({data: card}))
  .catch(err => {hdlError(res, err, 'Wrond cardId')})
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id }
    },
    {new: true}
  )
  .orFail(() => {mkError('Wrong cardId')})
  .populate(['owner', 'likes'])
  .then(card => card.populate(['owner', 'likes']))
  .then(card => res.status(200).send({data: card}))
  .catch(err => {hdlError(res, err, 'Wrond cardId')})
}

module.exports = {
  getCards,
  createCard,
  dltCard,
  likeCard,
  dislikeCard,
}