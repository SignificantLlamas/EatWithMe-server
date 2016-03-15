// Commented out to avoid linting error

var usersController = require('../controllers/users.controller.js');
var eventsController = require('../controllers/events.controller.js');

module.exports = function (app) {
  // app.get('/users/:userId/events', usersController.getEvents);
  app.get('/users/:userId', usersController.getOne);
  app.post('/users/', usersController.create);

  app.get('/events', eventsController.getAll);
  app.get('/events/:eventId', eventsController.getOne);
  app.post('/events', eventsController.create);
  app.put('/events/:eventId', eventsController.update);
};
