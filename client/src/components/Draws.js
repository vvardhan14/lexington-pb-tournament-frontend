import React from 'react';
import { useNavigate } from 'react-router-dom';

function Draws({ matches, teams }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pastel-gray p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pastel-darkGray">Pool Draws</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-pastel-pink text-white px-4 py-2 rounded-md hover:bg-pastel-purple transition duration-200"
          >
            Back
          </button>
        </div>
        <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Pool A</h2>
        <ul className="space-y-2 mb-6">
          {matches.filter(m => m.pool === 'A').map((m, i) => (
            <li key={i} className="bg-pastel-blue p-3 rounded-md text-pastel-darkGray">
              {teams[m.team1]?.players.join(' & ')} vs {teams[m.team2]?.players.join(' & ')}: {m.score1 ?? '-'} - {m.score2 ?? '-'}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Pool B</h2>
        <ul className="space-y-2">
          {matches.filter(m => m.pool === 'B').map((m, i) => (
            <li key={i} className="bg-pastel-blue p-3 rounded-md text-pastel-darkGray">
              {teams[m.team1]?.players.join(' & ')} vs {teams[m.team2]?.players.join(' & ')}: {m.score1 ?? '-'} - {m.score2 ?? '-'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Draws;