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
