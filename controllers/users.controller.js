var Users = require('../models/users.model.js');

exports.create = function create(fbId, fullName, firstName, pictureUrl) {
  return Users.findOne({ fbId: fbId })
  .then(function thenFoundUser(foundUser) {
    if (foundUser) {
      return foundUser;
    }
    return Users.create({ fbId: fbId, fullName: fullName, firstName: firstName,
      imageUrl: pictureUrl });
  });
};

exports.getOne = function getOne(userId) {
  return Users.findById(userId)
  .populate('events')
  .then(function returnUserInfo(user) {
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  });
};
