var UsersController = require('../controllers/users.controller');

exports.create = function create(req, res) {
  var username = req.body.username;

  UsersController.create(username)
  .then(function createComplete(user) {
    res.status(201).send(user);
  })
  .catch(function createFailed(err) {
    res.status(400).send(err);
  });
};

// exports.getOne = function (req, res) {
//   Users.findOne({ _id: req.params.userId })
//   .populate('events')
//   .then(function (person) {
//     if (person) {
//       res.status(200).json(person);
//     } else {
//       res.sendStatus(404);
//     }
//   })
//   .catch(function (err) {
//     res.status(400).send(err);
//   });
// };
