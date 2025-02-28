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
  const teamExists = teams.some(t => 
    (t.players.includes(player1) && t.players.includes(player2))
  );
  if (teamExists) return res.status(400).json({ message: 'This team combination already exists' });
  const teamsInPool = teams.filter(t => t.pool === pool).length;
  if (teamsInPool >= 6) return res.status(400).json({ message: `Pool ${pool} already has 6 teams` });
  const team = new Team({ players: [player1, player2], pool });
  await team.save();
  console.log(`Team added: ${player1} & ${player2}, Pool ${pool}, Total teams: ${teams.length + 1}`);
  res.status(201).json(team);
});

router.get('/matches', async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

router.post('/matches', isAdmin, async (req, res) => {
  const { team1Idx, team2Idx, pool } = req.body;
  if (!Number.isInteger(team1Idx) || !Number.isInteger(team2Idx) || team1Idx === team2Idx) {
    return res.status(400).json({ message: 'Invalid team indices: Must be different integers' });
  }
  if (!['A', 'B'].includes(pool)) return res.status(400).json({ message: 'Pool must be A or B' });
  const teams = await Team.find();
  if (team1Idx < 0 || team1Idx >= teams.length || team2Idx < 0 || team2Idx >= teams.length) {
    return res.status(400).json({ message: 'Team indices out of range' });
  }
  if (teams[team1Idx].pool !== pool || teams[team2Idx].pool !== pool) {
    return res.status(400).json({ message: 'Teams must belong to the selected pool' });
  }
  const matchExists = await Match.findOne({ team1: team1Idx, team2: team2Idx, pool });
  if (matchExists) return res.status(400).json({ message: 'This match already exists' });
  const match = new Match({ team1: team1Idx, team2: team2Idx, score1: null, score2: null, pool });
  await match.save();
  console.log(`Match added: Team ${team1Idx} (${teams[team1Idx].players.join('&')}) vs Team ${team2Idx} (${teams[team2Idx].players.join('&')}), Pool ${pool}`);
  res.status(201).json(match);
});

router.post('/matches/score', isAdmin, async (req, res) => {
  const { team1Idx, team2Idx, score1, score2 } = req.body;
  console.log(`Scoring match: Team ${team1Idx} vs Team ${team2Idx}, Score: ${score1}-${score2}`);
  const match = await Match.findOne({ team1: team1Idx, team2: team2Idx });
  if (!match) {
    console.log('Match not found');
    return res.status(404).json({ message: 'Match not found' });
  }
  match.score1 = score1;
  match.score2 = score2;
  await match.save();
  console.log('Match updated:', match);
  await updateStandings(team1Idx, team2Idx, score1, score2);
  console.log('Standings updated');
  res.json(match);
});

router.delete('/purge', isAdmin, async (req, res) => {
  try {
    await Player.deleteMany({});
    await Team.deleteMany({});
    await Match.deleteMany({});
    console.log('All data purged');
    res.status(200).json({ message: 'All data purged successfully' });
  } catch (err) {
    console.error('Error purging data:', err);
    res.status(500).json({ message: 'Error purging data', error: err.message });
  }
});

async function updateStandings(team1Idx, team2Idx, score1, score2) {
  const teams = await Team.find();
  console.log(`Updating standings: Team ${team1Idx} (${teams[team1Idx].players.join('&')}) vs Team ${team2Idx} (${teams[team2Idx].players.join('&')})`);
  // Update wins and losses
  if (score1 > score2) {
    teams[team1Idx].wins = (teams[team1Idx].wins || 0) + 1;
    teams[team2Idx].losses = (teams[team2Idx].losses || 0) + 1;
  } else if (score2 > score1) {
    teams[team2Idx].wins = (teams[team2Idx].wins || 0) + 1;
    teams[team1Idx].losses = (teams[team1Idx].losses || 0) + 1;
  }
  // Update cumulative scores
  teams[team1Idx].cumulativeScore = (teams[team1Idx].cumulativeScore || 0) + score1;
  teams[team2Idx].cumulativeScore = (teams[team2Idx].cumulativeScore || 0) + score2;
  await Promise.all([teams[team1Idx].save(), teams[team2Idx].save()]);
  console.log(`Updated teams: ${teams[team1Idx].wins}-${teams[team1Idx].losses}, Cumulative Score: ${teams[team1Idx].cumulativeScore}; ${teams[team2Idx].wins}-${teams[team2Idx].losses}, Cumulative Score: ${teams[team2Idx].cumulativeScore}`);
}

module.exports = router;