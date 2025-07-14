const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  totalPoints: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
