var mongoose = require('../config/db');

var eventsSchema = new mongoose.Schema({
  yelp_id: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  restaurant_name: {
    type: String,
    required: true
  },
  restaurant_address: {
    type: String,
    required: true
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
});

module.exports = mongoose.model('Events', eventsSchema);
