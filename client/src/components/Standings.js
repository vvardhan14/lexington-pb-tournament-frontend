import React from 'react';
import { useNavigate } from 'react-router-dom';

function Standings({ poolA, poolB, teams }) {
  const navigate = useNavigate();
  const poolARankings = [...poolA].sort((a, b) => b.wins - a.wins || a.losses - b.losses);
  const poolBRankings = [...poolB].sort((a, b) => b.wins - a.wins || a.losses - b.losses);

  return (
    <div className="min-h-screen bg-pastel-gray p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-pastel-darkGray">Pool Standings</h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-pastel-pink text-pastel-darkGray px-4 py-2 rounded-md hover:bg-pastel-purple hover:text-white transition duration-200"
            >
              Back
            </button>
          </div>
          <h2 className="text-xl font-semibold text-pastel-darkGray mb-4">Pool A</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-pastel-yellow">
                <tr>
                  <th className="px-4 py-2 text-pastel-darkGray">Team</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Wins</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Losses</th>
                </tr>
              </thead>
              <tbody>
                {poolARankings.map(t => (
                  <tr key={t._id} className="border-b border-pastel-gray">
                    <td className="px-4 py-2 text-pastel-darkGray">{t.players.join(' & ')}</td>
                    <td className="px-4 py-2 text-pastel-darkGray">{t.wins}</td>
                    <td className="px-4 py-2 text-pastel-darkGray">{t.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-xl font-semibold text-pastel-darkGray mt-6 mb-4">Pool B</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-pastel-yellow">
                <tr>
                  <th className="px-4 py-2 text-pastel-darkGray">Team</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Wins</th>
                  <th className="px-4 py-2 text-pastel-darkGray">Losses</th>
                </tr>
              </thead>
              <tbody>
                {poolBRankings.map(t => (
                  <tr key={t._id} className="border-b border-pastel-gray">
                    <td className="px-4 py-2 text-pastel-darkGray">{t.players.join(' & ')}</td>
                    <td className="px-4 py-2 text-pastel-darkGray">{t.wins}</td>
                    <td className="px-4 py-2 text-pastel-darkGray">{t.losses}</td>
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

export default Standings;