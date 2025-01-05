const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
  senderId: String,
  recipientId: String,
  status: String,
});

module.exports = mongoose.model('FriendRequest', FriendRequestSchema);