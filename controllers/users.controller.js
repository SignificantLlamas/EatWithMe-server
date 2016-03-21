var Users = require('../models/users.model.js');

exports.create = function create(username) {
  return Users.findOne({ username: username })
  .then(function thenFoundUser(foundUser) {
    if (foundUser) {
      return foundUser;
    }
    return Users.create({ username: username });
  });
};

exports.getOne = function getOne(req, res) {
  Users.findOne({ _id: req.params.userId })
  .populate('events')
  .then(function (person) {
    if (person) {
      res.status(200).json(person);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
};
