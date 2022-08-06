const mongoose = require('mongoose');

let Schema = mongoose.Schema

const CpuSchema = new Schema({
  using: Number,
  currentLoad: Number,
  nowdate: Date
});

module.exports = mongoose.model('cpudatas', CpuSchema);