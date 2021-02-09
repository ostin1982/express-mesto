const path = require('path');


const getDataFromFile = require('../helpers/files')


const dataPath = path.join(__dirname, '..', 'data', 'cards.json');


const getCards = (req, res) => {
  return getDataFromFile(dataPath)
  .then(cards => res.status(200).send(cards))
  .catch(error => res.status(400).send({ message: error.message }));
};


module.exports = getCards;