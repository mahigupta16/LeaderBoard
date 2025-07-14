const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', claimRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
