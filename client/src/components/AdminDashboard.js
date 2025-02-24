import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard({ logout, players, setPlayers, teams, setTeams, matches, setMatches, poolA, poolB, fetchData }) {
  const [playerName, setPlayerName] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [matchTeam1, setMatchTeam1] = useState('');
  const [matchTeam2, setMatchTeam2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const navigate = useNavigate();

  const addPlayer = async () => {
    if (playerName) {
      try {
        const res = await axios.post('http://localhost:5000/api/players', { name: playerName }, { headers: { 'x-user': 'admin' } });
        setPlayers([...players, res.data]);
        setPlayerName('');
        alert('Player added');
      } catch (err) {
        alert('Player already exists or invalid name');
      }
    }
  };

  const formTeam = async () => {
    if (player1 && player2 && player1 !== player2) {
      try {
        const res = await axios.post('http://localhost:5000/api/teams', { player1, player2 }, { headers: { 'x-user': 'admin' } });
        setTeams([...teams, res.data]);
        fetchData(); // Refresh matches if draws are generated
        alert('Team formed');
      } catch (err) {
        alert('Invalid team selection or max teams reached');
      }
    }
  };

  const enterScore = async () => {
    const team1Idx = parseInt(matchTeam1);
    const team2Idx = parseInt(matchTeam2);
    if (score1 >= 0 && score2 >= 0) {
      await axios.post('http://localhost:5000/api/matches/score', { team1Idx, team2Idx, score1: parseInt(score1), score2: parseInt(score2) }, { headers: { 'x-user': 'admin' } });
      fetchData();
      setScore1('');
      setScore2('');
      alert('Score entered');
    }
  };

  return (
    <div>
      <h1>Lexington PB Tournament Admin</h1>
      <button onClick={logout}>Logout</button>
      <h2>Add Player</h2>
      <input value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Player Name" />
      <button onClick={addPlayer}>Add Player</button>
      <h2>Form Team</h2>
      <select value={player1} onChange={e => setPlayer1(e.target.value)}>
        <option value="">Select Player 1</option>
        {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
      </select>
      <select value={player2} onChange={e => setPlayer2(e.target.value)}>
        <option value="">Select Player 2</option>
        {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
      </select>
      <button onClick={formTeam}>Form Team</button>
      <h2>Enter Match Score</h2>
      <select value={matchTeam1} onChange={e => setMatchTeam1(e.target.value)}>
        <option value="">Select Team 1</option>
        {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
      </select>
      <select value={matchTeam2} onChange={e => setMatchTeam2(e.target.value)}>
        <option value="">Select Team 2</option>
        {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
      </select>
      <input type="number" value={score1} onChange={e => setScore1(e.target.value)} placeholder="Team 1 Score" />
      <input type="number" value={score2} onChange={e => setScore2(e.target.value)} placeholder="Team 2 Score" />
      <button onClick={enterScore}>Enter Score</button>
      <button onClick={() => navigate('/standings')}>View Standings</button>
      <button onClick={() => navigate('/draws')}>View Draws</button>
      <button onClick={() => navigate('/current-match')}>View Current Match</button>
    </div>
  );
}

export default AdminDashboard;