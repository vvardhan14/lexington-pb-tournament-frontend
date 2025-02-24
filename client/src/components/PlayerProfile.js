import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlayerProfile({ logout, currentUser }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Lexington PB Player Profile</h1>
      <button onClick={logout}>Logout</button>
      <p>Name: {currentUser}</p>
      <button onClick={() => navigate('/standings')}>View Standings</button>
      <button onClick={() => navigate('/draws')}>View Draws</button>
      <button onClick={() => navigate('/current-match')}>View Current Match</button>
    </div>
  );
}

export default PlayerProfile;