module.exports = function (io) {
  io.on('connection', function ioConnect(socket) {
    socket.on('test', function ioEmit() {
      io.emit('hello World');
    });
  });
};
