import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PlayerProfile({ logout, currentUser }) {
  const [playedMatches, setPlayedMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  // Define fetchPlayerMatches with useCallback to prevent unnecessary re-renders
  const fetchPlayerMatches = useCallback(async () => {
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
  }, [currentUser]); // Dependency on currentUser, as it determines which player's matches to fetch

  useEffect(() => {
    fetchPlayerMatches();
  }, [fetchPlayerMatches]); // Add fetchPlayerMatches to dependency array

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
    <div className="min-h-screen bg-white p-6"> {/* White background for high contrast */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Player Profile</h1> {/* Black text */}
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
            Logout
          </button>
        </div>
        <p className="text-lg text-black mb-6">Name: <span className="font-semibold">{currentUser}</span></p> {/* Black text */}

        {/* Matches Played */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Matches Played</h2> {/* Black text */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800"> {/* Dark header for contrast */}
                <tr>
                  <th className="px-4 py-2 text-white">Opponent</th> {/* White text on dark background */}
                  <th className="px-4 py-2 text-white">Pool</th>
                  <th className="px-4 py-2 text-white">Score</th>
                </tr>
              </thead>
              <tbody>
                {playedMatches.length > 0 ? (
                  playedMatches.map((m, i) => {
                    const teamIdx = teams.findIndex(t => t.players.includes(currentUser));
                    return (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="px-4 py-2 text-black">{getOpponent(m, teamIdx)}</td> {/* Black text */}
                        <td className="px-4 py-2 text-black">{m.pool}</td>
                        <td className="px-4 py-2 text-black">{getScoreDisplay(m, teamIdx)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-black text-center">No matches played yet</td> {/* Black text */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Matches to Play */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Matches to Play</h2> {/* Black text */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800"> {/* Dark header for contrast */}
                <tr>
                  <th className="px-4 py-2 text-white">Opponent</th> {/* White text on dark background */}
                  <th className="px-4 py-2 text-white">Pool</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((m, i) => {
                    const teamIdx = teams.findIndex(t => t.players.includes(currentUser));
                    return (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="px-4 py-2 text-black">{getOpponent(m, teamIdx)}</td> {/* Black text */}
                        <td className="px-4 py-2 text-black">{m.pool}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="px-4 py-2 text-black text-center">No upcoming matches</td> {/* Black text */}
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            View Standings
          </button>
          <button
            onClick={() => navigate('/draws')}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            View Draws
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;