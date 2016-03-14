var mongoose = require('../config/db.js');

var usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]
});

module.exports = mongoose.model('Users', usersSchema);
