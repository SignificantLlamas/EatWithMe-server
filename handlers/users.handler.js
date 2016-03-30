var UsersController = require('../controllers/users.controller');

exports.create = function create(req, res) {
  var fbId = req.body.fbId;
  var fullName = req.body.fullName;
  var firstName = req.body.firstName;
  var pictureUrl = req.body.pictureUrl;

  UsersController.create(fbId, fullName, firstName, pictureUrl)
  .then(function createComplete(user) {
    res.status(201).send(user);
  })
  .catch(function createFailed(err) {
    res.status(400).send(err);
  });
};

exports.getOne = function getOne(req, res) {
  var userId = req.params.userId;

  UsersController.getOne(userId)
  .then(function getOneComplete(user) {
    res.status(200).json(user);
  })
  .catch(function getOneFailed(err) {
    res.status(400).send(err.message);
  });
};
