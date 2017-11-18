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
    type: [{
      content: String,
      id: String
    }],
    default: []
  },
  participants: {
    type: [String],
    default: []
  },
  phase: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Channel', channelSchema);
