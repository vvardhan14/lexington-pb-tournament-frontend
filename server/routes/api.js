const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Team = require('../models/Team');
const Match = require('../models/Match');

const isAdmin = (req, res, next) => {
  if (req.headers['x-user'] === 'admin') return next();
  res.status(403).json({ message: 'Admin access required' });
};

router.get('/players', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

router.post('/players', isAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  try {
    const player = new Player({ name });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: 'Player already exists' });
  }
});

router.get('/teams', async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.post('/teams', isAdmin, async (req, res) => {
  const { player1, player2, pool } = req.body;
  if (!player1 || !player2 || player1 === player2) return res.status(400).json({ message: 'Invalid players: Players must be different' });
  if (!['A', 'B'].includes(pool)) return res.status(400).json({ message: 'Pool must be A or B' });

  const teams = await Team.find();
  if (teams.length >= 12) return res.status(400).json({ message: 'Max teams reached' });

  // Check for duplicate team (same players, regardless of order)
  const teamExists = teams.some(t => 
    (t.players.includes(player1) && t.players.includes(player2))
  );
  if (teamExists) return res.status(400).json({ message: 'This team combination already exists' });

  const teamsInPool = teams.filter(t => t.pool === pool).length;
  if (teamsInPool >= 6) return res.status(400).json({ message: `Pool ${pool} already has 6 teams` });

  const team = new Team({ players: [player1, player2], pool });
  await team.save();
  if (teams.length === 11) generateDraws(); // Triggered when 12th team is added
  res.status(201).json(team);
});

router.get('/matches', async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

router.post('/matches/score', isAdmin, async (req, res) => {
  const { team1Idx, team2Idx, score1, score2 } = req.body;
  const match = await Match.findOne({ team1: team1Idx, team2: team2Idx });
  if (!match) return res.status(404).json({ message: 'Match not found' });
  match.score1 = score1;
  match.score2 = score2;
  await match.save();
  await updateStandings(team1Idx, team2Idx, score1, score2);
  res.json(match);
});

router.delete('/purge', isAdmin, async (req, res) => {
  try {
    await Player.deleteMany({});
    await Team.deleteMany({});
    await Match.deleteMany({});
    res.status(200).json({ message: 'All data purged successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error purging data', error: err.message });
  }
});

async function generateDraws() {
  const teams = await Team.find();
  if (teams.length !== 12) return;
  const poolA = teams.filter(t => t.pool === 'A');
  const poolB = teams.filter(t => t.pool === 'B');
  if (poolA.length !== 6 || poolB.length !== 6) return;
  await Match.deleteMany({});
  const matches = [
    ...generatePoolMatches(poolA, 'A'),
    ...generatePoolMatches(poolB, 'B'),
  ];
  await Match.insertMany(matches);
}

function generatePoolMatches(pool, poolName) {
  const matches = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      matches.push({ team1: teams.indexOf(pool[i]), team2: teams.indexOf(pool[j]), pool: poolName });
    }
  }
  return matches;
}

async function updateStandings(team1Idx, team2Idx, score1, score2) {
  const teams = await Team.find();
  if (score1 > score2) {
    teams[team1Idx].wins++;
    teams[team2Idx].losses++;
  } else if (score2 > score1) {
    teams[team2Idx].wins++;
    teams[team1Idx].losses++;
  }
  await Promise.all([teams[team1Idx].save(), teams[team2Idx].save()]);
}

module.exports = router;