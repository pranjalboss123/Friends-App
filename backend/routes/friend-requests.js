const express = require('express');
const router = express.Router();
const FriendRequest = require('../models/FriendRequest');

router.post('/', async (req, res) => {
  const { senderId, recipientId } = req.body;
  const newRequest = new FriendRequest({ senderId, recipientId, status: 'pending' });
  await newRequest.save();
  res.json({ success: true, message: 'Friend request sent!' });
});

router.post('/friend-requests/reject', async (req, res) => {
  try {
    console.log('Rejecting friend request...');
    const { requestId } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      console.error('Friend request not found');
      res.status(404).json({ message: 'Friend request not found' });
      return;
    }
    friendRequest.status = 'rejected';
    await friendRequest.save();
    console.log('Friend request rejected:', friendRequest);
    res.status(200).json({ message: 'Friend request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
});

router.post('/friend-requests/accept', async (req, res) => {
  try {
    console.log('Accepting friend request...');
    const { requestId } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      console.error('Friend request not found');
      res.status(404).json({ message: 'Friend request not found' });
      return;
    }
    friendRequest.status = 'accepted';
    await friendRequest.save();
    console.log('Friend request accepted:', friendRequest);
    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ message: 'Error accepting friend request' });
  }
});
router.post('/friend-requests/send', async (req, res) => {
  try {
    console.log('Sending friend request...');
    const { recipientId } = req.body;
    const senderId = req.user._id;
    const friendRequest = await FriendRequest.create({ senderId, recipientId, status: 'pending' });
    console.log('Friend request sent:', friendRequest);
    res.status(201).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ message: 'Error sending friend request' });
  }
});

module.exports = router;