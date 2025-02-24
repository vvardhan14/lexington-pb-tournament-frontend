const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  team1: { type: Number, required: true },
  team2: { type: Number, required: true },
  score1: { type: Number, default: null },
  score2: { type: Number, default: null },
  pool: { type: String, required: true },
});

module.exports = mongoose.model('Match', matchSchema);