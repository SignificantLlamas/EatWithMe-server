var Users = require('../models/users.model.js');

exports.create = function (req, res) {
  Users.findOne({ username: req.body.username })
  .then(function (user) {
    if (user) {
      return user;
    }
    return Users.create({ username: req.body.username });
  })
  .then(function (user) {
    res.status(201).send(user);
  })
  .catch(function (err) {
    res.status(400).send(err);
  });
};
