const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: { type: Number, default: 0 },
  portalUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
