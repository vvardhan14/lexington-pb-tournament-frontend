import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import PlayerProfile from './components/PlayerProfile';
import Standings from './components/Standings';
import Draws from './components/Draws';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    try {
      const [playersRes, teamsRes, matchesRes] = await Promise.all([
        axios.get(`${baseUrl}/api/players`),
        axios.get(`${baseUrl}/api/teams`),
        axios.get(`${baseUrl}/api/matches`),
      ]);
      setPlayers(playersRes.data);
      setTeams(teamsRes.data);
      setMatches(matchesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const poolA = teams.filter(t => t.pool === 'A');
  const poolB = teams.filter(t => t.pool === 'B');

  const login = (username, password) => {
    if (username === 'admin' && password === 'trump123') {
      setCurrentUser('admin');
    } else if (players.some(p => p.name === username && password === 'player123')) {
      setCurrentUser(username);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => setCurrentUser(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!currentUser ? <Login login={login} /> : <Navigate to={currentUser === 'admin' ? '/admin' : '/profile'} />} />
        <Route path="/admin" element={currentUser === 'admin' ? <AdminDashboard logout={logout} players={players} setPlayers={setPlayers} teams={teams} setTeams={setTeams} matches={matches} setMatches={setMatches} poolA={poolA} poolB={poolB} fetchData={fetchData} /> : <Navigate to="/" />} />
        <Route path="/profile" element={currentUser && currentUser !== 'admin' ? <PlayerProfile logout={logout} currentUser={currentUser} /> : <Navigate to="/" />} />
        <Route path="/standings" element={currentUser ? <Standings poolA={poolA} poolB={poolB} teams={teams} /> : <Navigate to="/" />} />
        <Route path="/draws" element={currentUser ? <Draws matches={matches} teams={teams} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;