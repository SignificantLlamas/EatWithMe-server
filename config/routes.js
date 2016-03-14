// Commented out to avoid linting error

// var eventsController = require('../controllers/events.controller.js');
var usersController = require('../controllers/users.controller.js');

module.exports = function (app) {
  // app.get('/users/:userid/events', usersController.getEvents);
  // app.get('/users/:userid', usersController.getOne);
  app.post('/users/', usersController.create);

  // app.get('/events', eventsController.getAll);
  // app.get('/events/:eventid', eventsController.getOne);
  // app.post('/events', eventsController.create);
  // app.put('/events/:eventid', eventsController.update);
};
