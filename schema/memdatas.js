const mongoose = require('mongoose');

let Schema = mongoose.Schema

const MemSchema = new Schema({
  using: Number,
  nowdate: Date
});

module.exports = mongoose.model('memdatas', MemSchema);