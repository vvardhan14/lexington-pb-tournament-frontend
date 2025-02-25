import React from 'react';
import { useNavigate } from 'react-router-dom';

function CurrentMatch({ matches, teams }) {
  const navigate = useNavigate();
  const ongoingMatch = matches.find(m => m.score1 === null || m.score2 === null) || matches[0];

  return (
    <div className="min-h-screen bg-pastel-gray p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pastel-darkGray">Current Match</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-pastel-pink text-white px-4 py-2 rounded-md hover:bg-pastel-purple transition duration-200"
          >
            Back
          </button>
        </div>
        <p className="text-lg text-pastel-darkGray">
          {ongoingMatch ? `${teams[ongoingMatch.team1]?.players.join(' & ')} vs ${teams[ongoingMatch.team2]?.players.join(' & ')}: ${ongoingMatch.score1 ?? '-'} - ${ongoingMatch.score2 ?? '-'}` : 'No current match'}
        </p>
      </div>
    </div>
  );
}

export default CurrentMatch;