var Events = require('../models/events.model');
var Users = require('../models/users.model');

// gets all data for one event (restaurant)
exports.getOne = function (req, res) {
  var eventId = req.params.eventId;

  Events.findOne({ _id: eventId })
  .then(function (foundEvent) {
    if (foundEvent) {
      res.status(201).json(foundEvent);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};

// get all events happening for one yelpId
exports.getAll = function (req, res) {
  Events.find({ yelpId: req.query.yelpId })
  .then(function (events) {
    res.status(200).json(events);
  })
  .catch(function (error) {
    res.status(400).json(error);
  });
};

// creates a new event
exports.create = function (req, res) {
  Events.create({
    yelpId: req.body.yelpId,
    dateTime: req.body.dateTime,
    min: req.body.min,
    max: req.body.max,
    restaurantName: req.body.restaurantName,
    restaurantAddress: req.body.restaurantAddress,
    creatorId: req.body.userId,
    users: [req.body.userId]
  })
  .then(function (event) {
    res.status(201).json(event);
  })
  .catch(function (err) {
    res.status(400).json(err);
  });
};

exports.update = function (req, res) {
  var eventId = req.params.eventid;
  var userId = req.body.userId;

  Events.findByIdAndUpdate(eventId, { $addToSet: { users: userId } })
  .then(function updateUser(foundEvent) {
    if (!foundEvent) {
      Error('event not found');
    }
    return Users.findByIdAndUpdate(userId, { $addToSet: { events: eventId } });
  })
  .then(function sendUpdateStatus(foundUser) {
    if (!foundUser) {
      Error('user not found');
    }
    res.sendStatus(202);
  })
  .catch(function updateError(error) {
    res.sendStatus(404);
    console.error(error);
  });
};
