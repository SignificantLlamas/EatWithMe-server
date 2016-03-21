module.exports = function (io) {
  // each time this namespace is called, a new socket-room is created
  var tableio = io.of('/table');

  tableio.on('connection', function ioConnect(socket) {
    socket.on('join', function ioEmit(message) {
      socket.join(message.eventId);
      tableio.to(message.eventId).emit('updateUsers', message.users);
    });

    socket.on('emitMessage', function emitMessage(eventId, message) {
      tableio.to(eventId).emit('returnMessage', message);
    });
  });
};
