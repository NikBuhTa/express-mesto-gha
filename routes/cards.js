const { getCards, createCard, dltCard, likeCard, dislikeCard } = require('../controllers/cards');
const express = require('express');
const cardRouter = express.Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', dltCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;