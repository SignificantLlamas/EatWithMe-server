var db = require('../config/db.js');

var usersSchema = new db.Schema({
  username: {
    type: String,
    required: true
  },
  events: [{ type: db.Schema.Types.ObjectId, ref: 'Events' }]
});

module.exports = db.model('Users', usersSchema);
