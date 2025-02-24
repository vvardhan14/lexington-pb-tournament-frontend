import React from 'react';
import { useNavigate } from 'react-router-dom';

function Draws({ matches, teams }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Lexington PB Pool Draws</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Pool A</h2>
      <ul>{matches.filter(m => m.pool === 'A').map((m, i) => <li key={i}>{teams[m.team1]?.players.join(' & ')} vs {teams[m.team2]?.players.join(' & ')}: {m.score1 ?? '-'} - {m.score2 ?? '-'}</li>)}</ul>
      <h2>Pool B</h2>
      <ul>{matches.filter(m => m.pool === 'B').map((m, i) => <li key={i}>{teams[m.team1]?.players.join(' & ')} vs {teams[m.team2]?.players.join(' & ')}: {m.score1 ?? '-'} - {m.score2 ?? '-'}</li>)}</ul>
    </div>
  );
}

export default Draws;