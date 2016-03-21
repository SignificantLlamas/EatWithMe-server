var Events = require('../models/events.model');
var Users = require('../models/users.model');
var Promise = require('bluebird');

// gets all data for one event (restaurant)
exports.getOne = function (eventId) {
  return Events.findOne({ _id: eventId })
  .populate('users')
  .then(function thenFoundEvent(foundEvent) {
    return foundEvent;
  });
};

// get all events happening for one yelpId
exports.getAll = function (yelpId) {
  return Events.find({ yelpId: yelpId })
  .then(function thenFoundEvents(foundEvents) {
    return foundEvents;
  });
};

// creates a new event
exports.create = function (userId, eventInfo) {
  return Users.findById(userId)
  .then(function thenFoundUser(foundUser) {
    if (!foundUser) {
      throw new Error('user not found');
    }

    return Events.create(eventInfo);
  })
  .then(function thenCreatedEvent(createdEvent) {
    return Users.findByIdAndUpdate(userId, { $push: { events: createdEvent._id } })
    .then(function thenReturnEventId() {
      return createdEvent._id;
    });
  });
};

// updates an event.users and user.events
exports.update = function (req, res) {
  var eventId = req.params.eventId;
  var userId = req.body.userId;

  Promise.all([Events.findById(eventId), Users.findById(userId)])
  .then(function updateEventAndUser(findResults) {
    if (!findResults[0]) {
      throw new Error('event not found');
    }

    if (!findResults[1]) {
      throw new Error('user not found');
    }

    return Promise.all([Events.findByIdAndUpdate(eventId, { $addToSet: { users: userId } }),
      Users.findByIdAndUpdate(userId, { $addToSet: { events: eventId } })]
    );
  })
  .then(function sendStatus() {
    res.sendStatus(202);
  })
  .catch(function updateError(error) {
    res.status(404).json({ error: error.message });
  });
};
