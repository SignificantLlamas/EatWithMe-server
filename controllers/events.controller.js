var Events = require('../models/events.model');

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
  .then(function () {
    res.sendStatus(201);
  })
  .catch(function (err) {
    res.status(400).json(err);
  });
};
