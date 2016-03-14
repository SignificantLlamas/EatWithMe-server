var Events = require('../models/events.model');

module.exports = {
  getOne: function (req, res) {
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
  }
};
