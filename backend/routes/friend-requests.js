const express = require('express');
const router = express.Router();
const FriendRequest = require('../models/FriendRequest');

router.post('/', async (req, res) => {
  const { senderId, recipientId } = req.body;
  const newRequest = new FriendRequest({ senderId, recipientId, status: 'pending' });
  await newRequest.save();
  res.json({ success: true, message: 'Friend request sent!' });
});

module.exports = router;