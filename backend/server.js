// import express from 'express';
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const app = express();
const friendRoutes = require('./routes/friends'); // Import friend routes

app.use('/api/friends', friendRoutes); // All friend routes will be prefixed with /api/friends
dotenv.config();
app.use('/api/auth', authRoutes);
app.use(express.json());
app.use(cors());



// Use your updated MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Database Connection Error:', err));


// Routes
app.get('/', (req, res) => {
    res.send("Backend is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
