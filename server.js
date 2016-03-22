var express = require('express');
var app = express();
var db = require('./config/db.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var PORT = process.env.port || 8080;

db.connect('mongodb://localhost/family-style');

require('./config/middleware.js')(app);
require('./config/routes.js')(app);
require('./config/socket.handler.js')(io);

server.listen(PORT, function serverListen() {
  console.log('Listening on port ' + PORT);  //  eslint-disable-line no-console
});

module.exports = app;
