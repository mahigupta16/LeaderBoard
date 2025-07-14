const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');

// 📌 Claim random points for user
router.post('/claim', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { totalPoints: points } },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: 'User not found' });

  const history = new History({
    userId,
    userName: user.name,
    pointsAwarded: points,
  });

  await history.save();

  res.json({ user, points });
});

// 📌 Get claim history
router.get('/history', async (req, res) => {
  const history = await History.find().sort({ claimedAt: -1 }).limit(50);
  res.json(history);
});

module.exports = router;