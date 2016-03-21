var EventsController = require('../controllers/events.controller');

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
    restaurantName: req.body.restaurantName,
    restaurantAddress: req.body.restaurantAddress,
    creatorId: req.body.userId,
    users: [req.body.userId]
  };

  EventsController.create(userId, eventInfo)
  .then(function thencreatedEventId(createdEventId) {
    res.status(201).json(createdEventId);
  })
  .catch(function errorCatch(err) {
    res.status(400).json(err);
  });
};

// // updates an event.users and user.events
// exports.update = function (req, res) {
//   var eventId = req.params.eventId;
//   var userId = req.body.userId;

//   Promise.all([Events.findById(eventId), Users.findById(userId)])
//   .then(function updateEventAndUser(findResults) {
//     if (!findResults[0]) {
//       throw new Error('event not found');
//     }

//     if (!findResults[1]) {
//       throw new Error('user not found');
//     }

//     return Promise.all([Events.findByIdAndUpdate(eventId, { $addToSet: { users: userId } }),
//       Users.findByIdAndUpdate(userId, { $addToSet: { events: eventId } })]
//     );
//   })
//   .then(function sendStatus() {
//     res.sendStatus(202);
//   })
//   .catch(function updateError(error) {
//     res.status(404).json({ error: error.message });
//   });
// };
