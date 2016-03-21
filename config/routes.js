// Commented out to avoid linting error
var eventsHandler = require('../handlers/events.handler.js');
var usersHandler = require('../handlers/users.handler.js');
var yelpController = require('../controllers/yelp.controller.js');

module.exports = function routesHandler(app) {
  // app.get('/users/:userId/events', usersController.getEvents);
  app.get('/users/:userId', usersHandler.getOne);
  app.post('/users/', usersHandler.create);

  app.get('/events', eventsHandler.getAll);
  app.get('/events/:eventId', eventsHandler.getOne);
  app.post('/events', eventsHandler.create);
  app.put('/events/:eventId', eventsHandler.update);

  app.get('/api/yelp', yelpController.search);
};
