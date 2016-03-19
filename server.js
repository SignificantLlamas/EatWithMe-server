var express = require('express');
var app = express();
var db = require('./config/db.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var PORT = process.env.port || 8080;

db.connect('mongodb://localhost/family-style');

require('./config/middleware.js')(app);
require('./config/routes.js')(app);

server.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});

io.on('connection', function ioConnect(socket) {
  socket.on('test', function ioEmit() {
    io.emit('hello World');
  });
});

module.exports = app;
