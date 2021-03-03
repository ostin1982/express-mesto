const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));

const getProfile = (req, res) => {
  User.findById(req.params._id)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Нет пользователя с таким id' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const createProfile = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: `Введены некорректные данные ${err}` });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Введены некорректные данные ${err}` });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Введены некорректные данные ${err}` });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar,
};
