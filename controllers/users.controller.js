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

exports.getOne = function getOne(userId) {
  return Users.findOne(userId)
  .populate('events')
  .then(function returnUserInfo(user) {
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  });
};
