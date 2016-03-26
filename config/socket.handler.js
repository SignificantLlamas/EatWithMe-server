var redis = require('redis');
var Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = function socketHandler(io) {
  // each time this namespace is called, a new socket-room is created
  var tableio = io.of('/table');
  var client = redis.createClient();

  tableio.on('connection', function ioConnect(socket) {
    socket.on('loadMessages', function loadMessages(eventId) {
      client.lrangeAsync([eventId, 0, -1])
      .then(function getMessages(messageIds) {
        return Promise.all(messageIds.map(function lookup(messageId) {
          return client.hgetallAsync(messageId);
        }));
      })
      .then(function sendMessages(messages) {
        tableio.to(eventId).emit('loadMessages', messages);
      });
    });

    socket.on('join', function ioEmit(message) {
      socket.join(message.eventId);
      tableio.to(message.eventId).emit('updateUsers', message.users);
    });

    socket.on('emitMessage', function emitMessage(eventId, message) {
      client.incrAsync('messageCount')
      .then(function addMessages(messageCount) {
        Promise.all([client.hmsetAsync(['m:' + messageCount, 'firstName',
            message.firstName, 'message', message.message]),
            client.rpushAsync([eventId, 'm:' + messageCount])]);
      })
      .then(function sendMessage() {
        tableio.to(eventId).emit('returnMessage', message);
      });
    });
  });
};
