import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard({ logout, players, setPlayers, teams, setTeams, matches, setMatches, poolA, poolB, fetchData }) {
  const [playerName, setPlayerName] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [teamPool, setTeamPool] = useState('A');
  const [matchTeam1, setMatchTeam1] = useState('');
  const [matchTeam2, setMatchTeam2] = useState('');
  const [matchPool, setMatchPool] = useState('A');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [playerMatches, setPlayerMatches] = useState({ playedMatches: [], upcomingMatches: [] });
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
        const res = await axios.post(`${baseUrl}/api/teams`, { player1, player2, pool: teamPool }, { headers: { 'x-user': 'admin' } });
        setTeams([...teams, res.data]);
        fetchData();
        setPlayer1('');
        setPlayer2('');
        alert('Team formed');
      } catch (err) {
        const message = err.response?.data?.message || 'Error forming team';
        alert(message);
      }
    } else {
      alert('Please select two different players');
    }
  };

  const addMatch = async () => {
    const team1Idx = parseInt(matchTeam1);
    const team2Idx = parseInt(matchTeam2);
    if (!isNaN(team1Idx) && !isNaN(team2Idx) && team1Idx !== team2Idx) {
      try {
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.post(`${baseUrl}/api/matches`, { team1Idx, team2Idx, pool: matchPool }, { headers: { 'x-user': 'admin' } });
        setMatches([...matches, res.data]);
        fetchData();
        setMatchTeam1('');
        setMatchTeam2('');
        alert('Match added successfully');
      } catch (err) {
        alert('Error adding match: ' + (err.response?.data?.message || 'Unknown error'));
      }
    } else {
      alert('Please select two different teams');
    }
  };

  const enterScore = async () => {
    const team1Idx = parseInt(matchTeam1);
    const team2Idx = parseInt(matchTeam2);
    if (score1 !== '' && score2 !== '' && !isNaN(team1Idx) && !isNaN(team2Idx)) {
      try {
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        await axios.post(`${baseUrl}/api/matches/score`, { 
          team1Idx, 
          team2Idx, 
          score1: parseInt(score1), 
          score2: parseInt(score2) 
        }, { headers: { 'x-user': 'admin' } });
        await fetchData();
        setMatchTeam1('');
        setMatchTeam2('');
        setScore1('');
        setScore2('');
        if (selectedPlayer) fetchPlayerMatches(selectedPlayer); // Refresh player matches if viewing
        alert('Score entered successfully');
      } catch (err) {
        alert('Error entering score: ' + (err.response?.data?.message || 'Unknown error'));
      }
    } else {
      alert('Please select teams and enter valid scores');
    }
  };

  const purgeData = async () => {
    if (window.confirm('Are you sure you want to purge all data? This cannot be undone.')) {
      try {
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        await axios.delete(`${baseUrl}/api/purge`, { headers: { 'x-user': 'admin' } });
        setPlayers([]);
        setTeams([]);
        setMatches([]);
        setPlayerMatches({ playedMatches: [], upcomingMatches: [] });
        alert('All data purged successfully');
      } catch (err) {
        alert('Error purging data');
      }
    }
  };

  const fetchPlayerMatches = async (playerName) => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${baseUrl}/api/player-matches/${playerName}`, { headers: { 'x-user': 'admin' } });
      setPlayerMatches(res.data);
    } catch (err) {
      alert('Error fetching player matches: ' + (err.response?.data?.message || 'Unknown error'));
      setPlayerMatches({ playedMatches: [], upcomingMatches: [] });
    }
  };

  const handlePlayerSelect = (e) => {
    const player = e.target.value;
    setSelectedPlayer(player);
    if (player) fetchPlayerMatches(player);
    else setPlayerMatches({ playedMatches: [], upcomingMatches: [] });
  };

  return (
    <div className="min-h-screen bg-white p-6"> {/* White background for high contrast */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1> {/* Black text */}
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
              Logout
            </button>
          </div>

          {/* Add Player */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Add Player</h2> {/* Black text */}
            <div className="flex space-x-4">
              <input
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Player Name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addPlayer}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Add Player
              </button>
            </div>
          </div>

          {/* Form Team */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Form Team</h2> {/* Black text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={player1}
                onChange={e => setPlayer1(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Player 1</option>
                {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
              </select>
              <select
                value={player2}
                onChange={e => setPlayer2(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Player 2</option>
                {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
              </select>
              <select
                value={teamPool}
                onChange={e => setTeamPool(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A">Pool A</option>
                <option value="B">Pool B</option>
              </select>
            </div>
            <button
              onClick={formTeam}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Form Team
            </button>
          </div>

          {/* Teams Formed */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Teams Formed</h2> {/* Black text */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800"> {/* Dark header for contrast */}
                  <tr>
                    <th className="px-4 py-2 text-white">Team</th> {/* White text on dark background */}
                    <th className="px-4 py-2 text-white">Pool</th>
                    <th className="px-4 py-2 text-white">Matches Won</th>
                    <th className="px-4 py-2 text-white">Losses</th>
                    <th className="px-4 py-2 text-white">Cumulative Score</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(t => (
                    <tr key={t._id} className="border-b border-gray-200">
                      <td className="px-4 py-2 text-black">{t.players.join(' & ')}</td> {/* Black text */}
                      <td className="px-4 py-2 text-black">{t.pool}</td>
                      <td className="px-4 py-2 text-black">{t.wins}</td>
                      <td className="px-4 py-2 text-black">{t.losses}</td>
                      <td className="px-4 py-2 text-black">{t.cumulativeScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Match */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Add Match</h2> {/* Black text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={matchTeam1}
                onChange={e => setMatchTeam1(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Team 1</option>
                {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
              </select>
              <select
                value={matchTeam2}
                onChange={e => setMatchTeam2(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Team 2</option>
                {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
              </select>
              <select
                value={matchPool}
                onChange={e => setMatchPool(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A">Pool A</option>
                <option value="B">Pool B</option>
              </select>
            </div>
            <button
              onClick={addMatch}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add Match
            </button>
          </div>

          {/* Enter Match Score */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Enter Match Score</h2> {/* Black text */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={matchTeam1}
                onChange={e => setMatchTeam1(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Team 1</option>
                {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
              </select>
              <select
                value={matchTeam2}
                onChange={e => setMatchTeam2(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Team 2</option>
                {teams.map((t, i) => <option key={t._id} value={i}>{t.players.join(' & ')}</option>)}
              </select>
              <input
                type="number"
                value={score1}
                onChange={e => setScore1(e.target.value)}
                placeholder="Team 1 Score"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={score2}
                onChange={e => setScore2(e.target.value)}
                placeholder="Team 2 Score"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={enterScore}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Enter Score
            </button>
          </div>

          {/* Player Matches */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Player Matches</h2> {/* Black text */}
            <div className="flex space-x-4 mb-4">
              <select
                value={selectedPlayer}
                onChange={handlePlayerSelect}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Player</option>
                {players.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            {selectedPlayer && (
              <>
                <h3 className="text-lg font-semibold text-black mb-2">Played Matches</h3> {/* Black text */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left">
                    <thead className="bg-gray-800"> {/* Dark header for contrast */}
                      <tr>
                        <th className="px-4 py-2 text-white">Team 1</th> {/* White text on dark background */}
                        <th className="px-4 py-2 text-white">Team 2</th>
                        <th className="px-4 py-2 text-white">Score</th>
                        <th className="px-4 py-2 text-white">Pool</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerMatches.playedMatches.map((m, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="px-4 py-2 text-black">{Array.isArray(m.team1) ? m.team1.join(' & ') : m.team1}</td> {/* Black text */}
                          <td className="px-4 py-2 text-black">{Array.isArray(m.team2) ? m.team2.join(' & ') : m.team2}</td>
                          <td className="px-4 py-2 text-black">{m.score1} - {m.score2}</td>
                          <td className="px-4 py-2 text-black">{m.pool}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Upcoming Matches</h3> {/* Black text */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-800"> {/* Dark header for contrast */}
                      <tr>
                        <th className="px-4 py-2 text-white">Team 1</th> {/* White text on dark background */}
                        <th className="px-4 py-2 text-white">Team 2</th>
                        <th className="px-4 py-2 text-white">Pool</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerMatches.upcomingMatches.map((m, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="px-4 py-2 text-black">{Array.isArray(m.team1) ? m.team1.join(' & ') : m.team1}</td> {/* Black text */}
                          <td className="px-4 py-2 text-black">{Array.isArray(m.team2) ? m.team2.join(' & ') : m.team2}</td>
                          <td className="px-4 py-2 text-black">{m.pool}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/standings')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              View Standings
            </button>
            <button
              onClick={() => navigate('/draws')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              View Draws
            </button>
            <button
              onClick={purgeData}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Purge All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;