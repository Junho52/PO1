const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const GpuSchema = new Schema({
  mem: Number,
  temp: Number,
  nowdate: Date
});

module.exports = mongoose.model('gpudatas', GpuSchema);