const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));

const getProfile = (req, res) => User.findOne({ id: req.params.id })
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    res.status(200).send(user);
  })
  .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));

const createProfile = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: `Введены некорректные данные ${err}` });
    }
    return res.status(500).send({ message: 'Ошибка на сервере' });
  });

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Нет пользователя с таким id' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Введены некорректные данные ${err}` });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar,
};
