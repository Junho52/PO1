const mongoose = require('mongoose');

let Schema = mongoose.Schema

const EventSchema = new Schema({
  start: Date,
  end: Date
});

module.exports = mongoose.model('eventrecords', EventSchema);