const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  players: [{ type: String, required: true }],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  pool: { type: String, required: true, enum: ['A', 'B'] },
  cumulativeScore: { type: Number, default: 0 } // New field for total scores
});

module.exports = mongoose.model('Team', teamSchema);