const path = require('path');


const getDataFromFile = require('../helpers/files')


const dataPath = path.join(__dirname, '..', 'data', 'users.json');


const getUsers = (req, res) => {
  return getDataFromFile(dataPath)
  .then(users => res.status(200).send(users))
  .catch(error => res.status(400).send({ message: error.message }));
};


const getProfile = (req, res) => {
  return getDataFromFile(dataPath)
    .then(users => users.find(user => user._id === req.params.id))
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
};


module.exports = { getUsers, getProfile };