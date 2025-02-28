import React from 'react';
import { useNavigate } from 'react-router-dom';

function Draws({ matches, teams }) {
  const navigate = useNavigate();
  const poolAMatches = matches.filter(m => m.pool === 'A');
  const poolBMatches = matches.filter(m => m.pool === 'B');

  return (
    <div className="min-h-screen bg-white p-6"> {/* Changed to white background for high contrast */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-black">Draws</h1> {/* Black text for high contrast */}
            <button
              onClick={() => navigate(-1)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Back
            </button>
          </div>
          <h2 className="text-xl font-semibold text-black mb-4">Pool A</h2> {/* Black text for high contrast */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800"> {/* Darker header for contrast */}
                <tr>
                  <th className="px-4 py-2 text-white">Team 1</th> {/* White text on dark background */}
                  <th className="px-4 py-2 text-white">Team 2</th>
                  <th className="px-4 py-2 text-white">Score</th>
                </tr>
              </thead>
              <tbody>
                {poolAMatches.map(m => (
                  <tr key={m._id} className="border-b border-gray-200">
                    <td className="px-4 py-2 text-black">{teams[m.team1]?.players.join(' & ') || m.team1}</td> {/* Black text */}
                    <td className="px-4 py-2 text-black">{teams[m.team2]?.players.join(' & ') || m.team2}</td>
                    <td className="px-4 py-2 text-black">{m.score1 !== null && m.score2 !== null ? `${m.score1} - ${m.score2}` : 'Not Played'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-xl font-semibold text-black mt-6 mb-4">Pool B</h2> {/* Black text for high contrast */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800"> {/* Darker header for contrast */}
                <tr>
                  <th className="px-4 py-2 text-white">Team 1</th> {/* White text on dark background */}
                  <th className="px-4 py-2 text-white">Team 2</th>
                  <th className="px-4 py-2 text-white">Score</th>
                </tr>
              </thead>
              <tbody>
                {poolBMatches.map(m => (
                  <tr key={m._id} className="border-b border-gray-200">
                    <td className="px-4 py-2 text-black">{teams[m.team1]?.players.join(' & ') || m.team1}</td> {/* Black text */}
                    <td className="px-4 py-2 text-black">{teams[m.team2]?.players.join(' & ') || m.team2}</td>
                    <td className="px-4 py-2 text-black">{m.score1 !== null && m.score2 !== null ? `${m.score1} - ${m.score2}` : 'Not Played'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draws;