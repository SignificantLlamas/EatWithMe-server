var Events = require('../models/events.model');

exports.getOne = function (req, res) {
  var eventid = req.params.eventid;

  Events.findOne({ yelp_id: eventid })
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

exports.getAll = function (req, res) {
  Events.find({ yelp_id: req.query.yelp_id })
  .then(function (events) {
    res.status(200).json(events);
  })
  .catch(function (error) {
    res.sendStatus(400).json(error);
  });
};

exports.create = function (req, res) {
  Events.create({
    yelp_id: req.body.yelpId,
    dateTime: req.body.dateTime,
    min: req.body.min,
    max: req.body.max,
    restaurant_name: req.body.restaurantName,
    restaurant_address: req.body.restaurantAddress,
    num_of_people: 1,
    creatorId: req.body.userId,
    users: [req.body.userId]
  })
  .then(function () {
    res.sendStatus(201);
  })
  .catch(function (err) {
    res.json(400, err);
  });
};
