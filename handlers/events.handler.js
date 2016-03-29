var EventsController = require('../controllers/events.controller');
var client = require('../config/redis.js');
var Promise = require('bluebird');

// gets all data for one event (restaurant)
exports.getOne = function getOne(req, res) {
  var eventId = req.params.eventId;

  EventsController.getOne(eventId)
  .then(function thenFoundEvent(foundEvent) {
    if (!foundEvent) {
      throw new Error('event not found');
    } else {
      res.status(201).json(foundEvent);
    }
  })
  .catch(function catchError(error) {
    res.status(404).json(error.message);
  });
};

// get all events happening for one yelpId
exports.getAll = function getAll(req, res) {
  var yelpId = req.query.yelpId;

  EventsController.getAll(yelpId)
  .then(function thenFoundEvents(foundEvents) {
    res.status(200).json(foundEvents);
  })
  .catch(function catchError(error) {
    res.status(400).json(error);
  });
};

// creates a new event
exports.create = function create(req, res) {
  var userId = req.body.userId;
  var eventInfo = {
    yelpId: req.body.yelpId,
    dateTime: req.body.dateTime,
    min: req.body.min,
    max: req.body.max,
    phone: req.body.phone,
    restaurantName: req.body.restaurantName,
    restaurantAddress: req.body.restaurantAddress,
    creatorId: req.body.userId,
    users: [req.body.userId]
  };
  var createdEventId;
  EventsController.create(userId, eventInfo)
  .then(function thenCreatedEventId(eventId) {
    // Adding restaurant info to redis
    var addressString = req.body.restaurantAddress.address[0] + ' ' +
    req.body.restaurantAddress.city + ' ' +
    req.body.restaurantAddress.state_code + ' ' +
    req.body.restaurantAddress.postal_code;
    createdEventId = eventId;
    return Promise.all([client.hmsetAsync([req.body.yelpId, 'restaurantName',
      req.body.restaurantName, 'restaurantAddress', addressString]),
      client.zincrbyAsync(['leaderboard', 1, req.body.yelpId])]);
  })
  .then(function returnEventId() {
    res.status(201).json(createdEventId);
  })
  .catch(function errorCatch(err) {
    res.status(400).json(err);
  });
};

// updates an event.users and user.events
exports.update = function update(req, res) {
  var eventId = req.params.eventId;
  var userId = req.body.userId;

  EventsController.update(eventId, userId)
  .then(function sendStatus(updateArray) {
    var yelpId = updateArray[0].yelpId;
    client.zincrbyAsync(['leaderboard', 1, yelpId]);
    res.status(202).json(eventId);
  })
  .catch(function updateError(error) {
    res.status(404).json({ error: error.message });
  });
};

exports.removeUserFromEvent = function removeUserFromEvent(req, res) {
  var eventId = req.params.eventId;
  var userId = req.body.userId;
  EventsController.removeUserFromEvent(eventId, userId)
  .then(function success() {
    res.status(202);
  })
  .catch(function removeError(err) {
    res.status(400).json(err);
  });
};
