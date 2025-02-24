import React from 'react';
import { useNavigate } from 'react-router-dom';

function Standings({ poolA, poolB, teams }) {
  const navigate = useNavigate();
  const poolARankings = [...poolA].sort((a, b) => b.wins - a.wins || a.losses - b.losses);
  const poolBRankings = [...poolB].sort((a, b) => b.wins - a.wins || a.losses - b.losses);

  return (
    <div>
      <h1>Lexington PB Pool Standings</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Pool A</h2>
      <table>
        <thead><tr><th>Team</th><th>Wins</th><th>Losses</th></tr></thead>
        <tbody>{poolARankings.map(t => <tr key={t._id}><td>{t.players.join(' & ')}</td><td>{t.wins}</td><td>{t.losses}</td></tr>)}</tbody>
      </table>
      <h2>Pool B</h2>
      <table>
        <thead><tr><th>Team</th><th>Wins</th><th>Losses</th></tr></thead>
        <tbody>{poolBRankings.map(t => <tr key={t._id}><td>{t.players.join(' & ')}</td><td>{t.wins}</td><td>{t.losses}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default Standings;