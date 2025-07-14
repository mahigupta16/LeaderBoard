import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function App() {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState('');
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchHistory();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get(`${API}/leaderboard`);
    setLeaderboard(res.data);
  };

  const fetchHistory = async () => {
    const res = await axios.get(`${API}/history`);
    setHistory(res.data);
  };

  const handleClaim = async () => {
    if (!selectedUser) return alert('Please select a user');
    const res = await axios.post(`${API}/claim`, { userId: selectedUser });
    setPointsAwarded(res.data.points);
    setSelectedUser('');
    fetchLeaderboard();
    fetchHistory();
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    try {
      await axios.post(`${API}/users`, { name: newUser });
      setNewUser('');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding user');
    }
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-yellow-50 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">🏆 Leaderboard</h1>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Claim Points</h2>
          <select
            className="w-full border rounded p-2 mb-3"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value=''>-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            onClick={handleClaim}
          >
            Claim Random Points
          </button>
          {pointsAwarded !== null && (
            <p className="mt-2 text-green-600 font-semibold">+{pointsAwarded} points awarded!</p>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Add New User</h2>
          <input
            type="text"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Enter user name"
          />
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>

      {/* Leaderboard UI */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🏅 Top 3 Users</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {topThree.map((user, i) => (
            <div key={user._id} className={`p-4 rounded-xl shadow w-[110px] text-center ${i === 0 ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white'}`}>
              <div className="text-lg font-bold mb-1">{['🥇','🥈','🥉'][i]}</div>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-1 border"
              />
              <div className="text-sm font-semibold truncate">{user.name}</div>
              <div className="text-xs text-gray-500">ID: {user._id.slice(-6)}</div>
              <div className="mt-2 text-orange-500 font-bold">🔥 {user.totalPoints}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="text-xl font-semibold mb-4">📋 Full Leaderboard</h2>
        {rest.map((user, idx) => (
          <div key={user._id} className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center space-x-3">
              <div className="text-gray-600 font-bold w-6">{idx + 4}</div>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <div className="font-medium text-gray-800 truncate w-40">{user.name}</div>
                <div className="text-xs text-gray-500">ID: {user._id.slice(-6)}</div>
              </div>
            </div>
            <div className="text-orange-500 font-bold">🔥 {user.totalPoints}</div>
          </div>
        ))}
      </div>

      {/* History Section */}
      <div className="bg-white p-4 mt-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">🕒 Claim History</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          {history.map((h) => (
            <li key={h._id}>
              <strong>{h.userName}</strong> claimed <span className="text-blue-600 font-medium">{h.pointsAwarded} pts</span> on {new Date(h.claimedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
