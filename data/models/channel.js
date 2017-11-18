var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  time: {
    default: 0,
    type: Number
  },
  idea: {
    type: [String],
    default: []
  },
  participants: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Channel', channelSchema);
