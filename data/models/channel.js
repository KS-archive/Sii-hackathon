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
  idea: [{
    context: String
  }]
});

module.exports = mongoose.model('Channel', channelSchema);
