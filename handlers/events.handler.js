var EventsController = require('../controllers/events.controller');
var client = require('../config/redis.js');
var Promise = require('bluebird');
// gets all data for nearby events (restaurant)
exports.getNearby = function getNearby(req, res) {
  var lng = req.query.lng;
  var lat = req.query.lat;

  EventsController.getNearby(lng, lat)
  .then(function thenFoundEvents(foundEvents) {
    if (!foundEvents) {
      throw new Error('event not found');
    } else {
      res.status(201).json(foundEvents);
    }
  })
  .catch(function catchError(error) {
    res.status(404).json(error.message);
  });
};

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
  .then(function thenFutureEvents(futureEvents) {
    res.status(200).json(futureEvents);
  })
  .catch(function catchError(error) {
    res.status(400).json(error);
  });
};

// creates a new event
exports.create = function create(req, res) {
  var createdEventId;
  var userId = req.body.userId;
  var location = {
    type: 'Point',
    coordinates: [
      req.body.restaurantAddress.coordinate.longitude,
      req.body.restaurantAddress.coordinate.latitude
    ]
  };
  var eventInfo = {
    yelpId: req.body.yelpId,
    dateTime: req.body.dateTime,
    image: req.body.image,
    max: req.body.max,
    phone: req.body.phone,
    restaurantName: req.body.restaurantName,
    restaurantAddress: req.body.restaurantAddress,
    location: location,
    creatorId: req.body.userId,
    users: [req.body.userId]
  };
  EventsController.create(userId, eventInfo)
  .then(function thenCreatedEventId(eventId) {
    // Adding restaurant info to redis
    var address = req.body.restaurantAddress;
    createdEventId = eventId;
    return Promise.all([client.hmsetAsync([req.body.yelpId, 'restaurantName',
      req.body.restaurantName, 'address', address.address[0],
      'city', address.city, 'state_code', address.state_code,
      'postal_code', address.postal_code, 'image', req.body.image,
      'yelpId', req.body.yelpId]),
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
