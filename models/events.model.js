var mongoose = require('../config/db');

var eventsSchema = new mongoose.Schema({
  yelpId: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  restaurantAddress: {
    type: Object,
    required: true
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
});

eventsSchema.index({ dateTime: 1 }, { expireAfterSeconds: 60 * 60 * 24 });
module.exports = mongoose.model('Events', eventsSchema);
