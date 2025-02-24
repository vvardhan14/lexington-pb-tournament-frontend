const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  players: [{ type: String, required: true }],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

module.exports = mongoose.model('Team', teamSchema);