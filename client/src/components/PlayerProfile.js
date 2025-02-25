import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlayerProfile({ logout, currentUser }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pastel-gray p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pastel-darkGray">Player Profile</h1>
          <button onClick={logout} className="bg-pastel-pink text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-purple hover:text-white transition duration-200">
            Logout
          </button>
        </div>
        <p className="text-lg text-pastel-darkGray mb-6">Name: <span className="font-semibold">{currentUser}</span></p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/standings')}
            className="w-full bg-pastel-blue text-pastel-darkGray py-2 rounded-md hover:bg-pastel-green transition duration-200"
          >
            View Standings
          </button>
          <button
            onClick={() => navigate('/draws')}
            className="w-full bg-pastel-blue text-pastel-darkGray py-2 rounded-md hover:bg-pastel-green transition duration-200"
          >
            View Draws
          </button>
          <button
            onClick={() => navigate('/current-match')}
            className="w-full bg-pastel-blue text-pastel-darkGray py-2 rounded-md hover:bg-pastel-green transition duration-200"
          >
            View Current Match
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;