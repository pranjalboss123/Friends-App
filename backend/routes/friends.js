const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/users/search', async (req, res) => {
  try {
    const { username } = req.query;
    const users = await User.find({ username: { $regex: username, $options: 'i' } });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Error searching users', error });
  }
});

router.get('/friends', async (req, res) => {
  try {
    const friends = await User.findById(req.user._id).populate('friends');
    res.status(200).json(friends.friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Error fetching friends', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const friends = await User.find({ _id: { $in: user.friends } });
    res.status(200).json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Error fetching friends', error });
  }
});
// Add friend (send friend request)
router.post('/add/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body; // The friend to add

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding friend', error });
  }
});

module.exports = router;
