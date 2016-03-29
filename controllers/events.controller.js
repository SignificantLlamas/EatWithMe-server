var Events = require('../models/events.model');
var Users = require('../models/users.model');
var Promise = require('bluebird');

// gets all data for one event (restaurant)
exports.getOne = function getOne(eventId) {
  return Events.findOne({ _id: eventId })
  .populate('users');
};

// get all events happening for one yelpId
exports.getAll = function getAll(yelpId) {
  return Events.find({ yelpId: yelpId })
  .then(function sendFutureEvents(foundEvents) {
    var i;
    var futureEvents = [];
    var currentDate = new Date();

    for (i = 0; i < foundEvents.length; i++) {
      if (foundEvents[i].dateTime > currentDate) {
        futureEvents.push(foundEvents[i]);
      }
    }

    return futureEvents;
  });
};

// creates a new event
exports.create = function create(userId, eventInfo) {
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
exports.update = function update(eventId, userId) {
  return Promise.all([Events.findById(eventId), Users.findById(userId)])
  .then(function updateEventAndUser(findResults) {
    if (findResults[0].max <= findResults[0].users.length) {
      throw new Error('ERRMAXUSERS');
    }

    if (!findResults[0]) {
      throw new Error('event not found');
    }

    if (!findResults[1]) {
      throw new Error('user not found');
    }

    return Promise.all([Events.findByIdAndUpdate(eventId, { $addToSet: { users: userId } }),
      Users.findByIdAndUpdate(userId, { $addToSet: { events: eventId } })]
    );
  });
};

exports.removeUserFromEvent = function removeUserFromEvent(eventId, userId) {
  return Promise.all([Events.findById(eventId), Users.findById(userId)])
  .then(function remove(EventAndUserArray) {
    var i;
    var j;

    if (!EventAndUserArray[0]) {
      throw new Error('event not found');
    }

    if (!EventAndUserArray[1]) {
      throw new Error('user not found');
    }

    // remove user from event.users
    for (i = 0; i < EventAndUserArray[0].users.length; i++) {
      if (String(EventAndUserArray[0].users[i]) === userId) {
        EventAndUserArray[0].users.splice(i, 1);
        EventAndUserArray[0].save();
      }
    }

    // remove event from user.events
    for (j = 0; j < EventAndUserArray[1].events.length; j++) {
      if (String(EventAndUserArray[1].events[j]) === eventId) {
        EventAndUserArray[1].events.splice(j, 1);
        EventAndUserArray[1].save();
      }
    }
    return true;
  });
};
