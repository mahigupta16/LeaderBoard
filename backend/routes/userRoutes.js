const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 📌 Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 📌 Add a new user
router.post('/users', async (req, res) => {
  const { name } = req.body;
  const existing = await User.findOne({ name });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ name });
  await user.save();
  res.json(user);
});

// 📌 Get leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

module.exports = router;
