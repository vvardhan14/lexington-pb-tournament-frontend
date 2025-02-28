import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PlayerProfile({ logout, currentUser }) {
  const [playedMatches, setPlayedMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayerMatches();
  }, []);

  const fetchPlayerMatches = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const teamsRes = await axios.get(`${baseUrl}/api/teams`);
      const teamsData = teamsRes.data;
      setTeams(teamsData);

      // Find the player's team index
      const teamIdx = teamsData.findIndex(t => t.players.includes(currentUser));
      if (teamIdx === -1) {
        console.log('Player not found in any team');
        return;
      }

      const matchesRes = await axios.get(`${baseUrl}/api/matches`);
      const allMatches = matchesRes.data;

      // Filter matches for the player's team
      const playerMatches = allMatches.filter(m => m.team1 === teamIdx || m.team2 === teamIdx);
      setPlayedMatches(playerMatches.filter(m => m.score1 !== null && m.score2 !== null));
      setUpcomingMatches(playerMatches.filter(m => m.score1 === null && m.score2 === null));
    } catch (err) {
      console.error('Error fetching player matches:', err);
      setPlayedMatches([]);
      setUpcomingMatches([]);
    }
  };

  const getOpponent = (match, teamIdx) => {
    const opponentIdx = match.team1 === teamIdx ? match.team2 : match.team1;
    return teams[opponentIdx]?.players.join(' & ') || 'Unknown';
  };

  const getScoreDisplay = (match, teamIdx) => {
    const playerScore = match.team1 === teamIdx ? match.score1 : match.score2;
    const opponentScore = match.team1 === teamIdx ? match.score2 : match.score1;
    return `${playerScore} - ${opponentScore}`;
  };

  return (
    <div className="min-h-screen bg-pastel-gray p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pastel-darkGray">Player Profile</h1>
          <button onClick={logout} className="bg-pastel-pink text-white px-4 py-2 rounded-md hover:bg-pastel-purple transition duration-200">
            Logout
          </button>
        </div>
        <p className="text-lg text-pastel-darkGray mb-6">Name: <span className="font-semibold">{currentUser}</span></p>

        {/* Matches Played */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Matches Played</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-pastel-yellow">
                <tr>
                  <th className="px-4 py-2 text-pastel-darkGray">Opponent</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Pool</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Score</th>
                </tr>
              </thead>
              <tbody>
                {playedMatches.length > 0 ? (
                  playedMatches.map((m, i) => {
                    const teamIdx = teams.findIndex(t => t.players.includes(currentUser));
                    return (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-2 text-pastel-darkGray">{getOpponent(m, teamIdx)}</td>
                        <td className="px-4 py-2 text-pastel-darkGray">{m.pool}</td>
                        <td className="px-4 py-2 text-pastel-darkGray">{getScoreDisplay(m, teamIdx)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-pastel-darkGray text-center">No matches played yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Matches to Play */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Matches to Play</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-pastel-yellow">
                <tr>
                  <th className="px-4 py-2 text-pastel-darkGray">Opponent</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Pool</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((m, i) => {
                    const teamIdx = teams.findIndex(t => t.players.includes(currentUser));
                    return (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-2 text-pastel-darkGray">{getOpponent(m, teamIdx)}</td>
                        <td className="px-4 py-2 text-pastel-darkGray">{m.pool}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="px-4 py-2 text-pastel-darkGray text-center">No upcoming matches</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/standings')}
            className="w-full bg-pastel-blue text-white py-2 rounded-md hover:bg-pastel-green transition duration-200"
          >
            View Standings
          </button>
          <button
            onClick={() => navigate('/draws')}
            className="w-full bg-pastel-blue text-white py-2 rounded-md hover:bg-pastel-green transition duration-200"
          >
            View Draws
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;