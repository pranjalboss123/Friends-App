const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cors = require('cors');
 const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials (if needed)
}));
app.use(express.json());
router.get('/search', async (req, res) => {
  try {
    console.log('Fetching users...');
    const searchQuery = req.query.username;
    const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
    console.log('Users fetched:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/friend-requests', async (req, res) => {
  try {
    console.log('Fetching friend requests...');
    const friendRequests = await User.findById(req.user._id).populate('friendRequests');
    console.log('Friend requests fetched:', friendRequests);
    res.status(200).json(friendRequests.friendRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
});

router.get('/friends', async (req, res) => {
  try {
    console.log('Fetching friends...');
    const friends = await User.findById(req.user._id).populate('friends');
    console.log('Friends fetched:', friends);
    res.status(200).json(friends.friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Error fetching friends' });
  }
});
module.exports = router;