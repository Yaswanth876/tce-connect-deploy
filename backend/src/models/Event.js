const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, default: 'TBA' },
  venue: { type: String, default: 'TBA' },
  department: { type: String, default: 'General' },
  type: { 
    type: String, 
    enum: ['technical', 'cultural', 'sports'], 
    default: 'technical' 
  },
  club: { type: String, default: '' },
  maxParticipants: { type: Number, default: 100 },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
