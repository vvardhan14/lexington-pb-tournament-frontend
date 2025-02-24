import React from 'react';
import { useNavigate } from 'react-router-dom';

function CurrentMatch({ matches, teams }) {
  const navigate = useNavigate();
  const ongoingMatch = matches.find(m => m.score1 === null || m.score2 === null) || matches[0];

  return (
    <div>
      <h1>Lexington PB Current Match</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <p>{ongoingMatch ? `${teams[ongoingMatch.team1]?.players.join(' & ')} vs ${teams[ongoingMatch.team2]?.players.join(' & ')}: ${ongoingMatch.score1 ?? '-'} - ${ongoingMatch.score2 ?? '-'}` : 'No current match'}</p>
    </div>
  );
}

export default CurrentMatch;