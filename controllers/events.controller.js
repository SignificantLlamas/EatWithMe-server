var Events = require('../models/events.model');

module.exports = {
  getOne: function (req, res) {
    var eventid = req.params.eventid;

    Events.findOne({ yelp_id: eventid })
    .then(function (foundEvent) {
      if (foundEvent) {
        res.status(200).json(foundEvent);
      } else {
        res.sendStatus(400);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
