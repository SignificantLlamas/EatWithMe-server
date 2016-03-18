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
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
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
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', autopopulate: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', autopopulate: true }]
});

module.exports = mongoose.model('Events', eventsSchema);
