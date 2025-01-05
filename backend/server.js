// import express from 'express';
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
app.use(express.json()); // Add this line to parse the request body
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded requests
const passport = require('passport');
require('dotenv').config();

const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
}, (payload, done) => {
  User.findById(payload.userId).then((user) => {
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }).catch((error) => {
    return done(error, false);
  });
}));
app.use(cors());
const userRoutes = require('./routes/users');
const friendRequestRoutes = require('./routes/friend-requests');



app.use('/api/users', userRoutes);
app.use('/api/friend-requests', friendRequestRoutes);

// ... (rest of the existing code remains the same)

app.get('/api/users/search', async (req, res) => {
  const searchQuery = req.query.username;
  const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
  res.json(users);
});

app.post('/api/friend-requests', async (req, res) => {
  const { senderId, recipientId } = req.body;
  const newRequest = new FriendRequest({ senderId, recipientId, status: 'pending' });
  await newRequest.save();
  res.json({ success: true, message: 'Friend request sent!' });
});

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials (if needed)
}));
const authRoutes = require('./routes/Auth');
const friendRoutes = require('./routes/friends'); // Import friend routes

app.use('/api/friends', friendRoutes); // All friend routes will be prefixed with /api/friends
dotenv.config();
app.use('/api/auth', authRoutes);
app.use(express.json());




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
