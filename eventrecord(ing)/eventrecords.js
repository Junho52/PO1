const mongoose = require('mongoose');

let Schema = mongoose.Schema

const EventSchema = new Schema({
  event: String,
  nowdate: Date
});

module.exports = mongoose.model('eventrecords', EventSchema);