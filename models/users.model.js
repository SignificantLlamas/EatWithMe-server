var mongoose = require('../config/db.js');

var usersSchema = new mongoose.Schema({
  fbId: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]
});

module.exports = mongoose.model('Users', usersSchema);
