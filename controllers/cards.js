const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));

const createCard = (req, res) => {
  Card.create({ ...req.body })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные карточки' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const deleteCard = (req, res) => Card.findByIdAndDelete(req.params._id)
  .orFail(new Error('NotFound'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Нет карточки с таким id' });
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Карточка с таким id не найдена' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('NotFound'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Нет карточки с таким id' });
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Карточка с таким id не найдена' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('NotFound'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Нет карточки с таким id' });
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Карточка с таким id не найдена' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
