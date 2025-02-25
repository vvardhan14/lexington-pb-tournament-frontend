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
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.post(`${baseUrl}/api/players`, { name: playerName }, { headers: { 'x-user': 'admin' } });
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
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.post(`${baseUrl}/api/teams`, { player1, player2 }, { headers: { 'x-user': 'admin' } });
        setTeams([...teams, res.data]);
        fetchData();
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
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.post(`${baseUrl}/api/matches/score`, { team1Idx, team2Idx, score1: parseInt(score1), score2: parseInt(score2) }, { headers: { 'x-user': 'admin' } });
      fetchData();
      setScore1('');
      setScore2('');
      alert('Score entered');
    }
  };

  return (
    <div className="min-h-screen bg-pastel-gray p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-pastel-darkGray">Admin Dashboard</h1>
            <button onClick={logout} className="bg-pastel-pink text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-purple hover:text-white transition duration-200">
              Logout
            </button>
          </div>

          {/* Add Player */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Add Player</h2>
            <div className="flex space-x-4">
              <input
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Player Name"
                className="flex-1 px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
              />
              <button
                onClick={addPlayer}
                className="bg-pastel-green text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-yellow hover:text-pastel-darkGray transition duration-200"
              >
                Add Player
              </button>
            </div>
          </div>

          {/* Form Team */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Form Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={player1}
                onChange={e => setPlayer1(e.target.value)}
                className="px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
              >
                <option value="">Select Player 1</option>
                {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
              </select>
              <select
                value={player2}
                onChange={e => setPlayer2(e.target.value)}
                className="px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
              >
                <option value="">Select Player 2</option>
                {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
              </select>
              <button
                onClick={formTeam}
                className="bg-pastel-blue text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-purple hover:text-white transition duration-200"
              >
                Form Team
              </button>
            </div>
          </div>

          {/* Enter Match Score */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Enter Match Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={matchTeam1}
                onChange={e => setMatchTeam1(e.target.value)}
                className="px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-purple"
              >
                <option value="">Select Team 1</option>
                {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
              </select>
              <select
                value={matchTeam2}
                onChange={e => setMatchTeam2(e.target.value)}
                className="px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-purple"
              >
                <option value="">Select Team 2</option>
                {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
              </select>
              <input
                type="number"
                value={score1}
                onChange={e => setScore1(e.target.value)}
                placeholder="Team 1 Score"
                className="px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-purple"
              />
              <input
                type="number"
                value={score2}
                onChange={e => setScore2(e.target.value)}
                placeholder="Team 2 Score"
                className="px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-purple"
              />
            </div>
            <button
              onClick={enterScore}
              className="mt-4 bg-pastel-purple text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-pink hover:text-white transition duration-200"
            >
              Enter Score
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/standings')}
              className="bg-pastel-yellow text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-green transition duration-200"
            >
              View Standings
            </button>
            <button
              onClick={() => navigate('/draws')}
              className="bg-pastel-yellow text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-green transition duration-200"
            >
              View Draws
            </button>
            <button
              onClick={() => navigate('/current-match')}
              className="bg-pastel-yellow text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-green transition duration-200"
            >
              View Current Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;