const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/search', async (req, res) => {
  const searchQuery = req.query.username;
  const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
  res.json(users);
});

module.exports = router;