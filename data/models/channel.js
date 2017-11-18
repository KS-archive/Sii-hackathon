var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  time: Number
});

module.exports = mongoose.model('Channel', channelSchema);
