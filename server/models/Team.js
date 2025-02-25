const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  players: [{ type: String, required: true }],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  pool: { type: String, required: true, enum: ['A', 'B'] } // New field: 'A' or 'B'
});

module.exports = mongoose.model('Team', teamSchema);