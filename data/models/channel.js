var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: String,
  time: Number
});

module.exports = mongoose.model('Channel', channelSchema);