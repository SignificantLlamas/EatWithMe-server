module.exports = function (io) {
  // each time this namespace is called, a new socket-room is created
  var tableio = io.of('/table');
  tableio.on('connection', function ioConnect(socket) {
    socket.on('join', function ioEmit(eventId) {
      console.log('socket join', eventId);
      socket.join(eventId);
    });
    socket.on('emitMessage', function emitMessage(eventId, message) {
      console.log('emit message', eventId, message);
      tableio.to(eventId).emit('eventjoined', message);
    });
  });
};
