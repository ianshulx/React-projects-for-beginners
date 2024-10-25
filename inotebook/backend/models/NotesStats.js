const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  totalNotes: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  updatedNotes: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  deletedNotes: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserStats', userStatsSchema);
