import React, { useState, useEffect } from "react";
import axios from "axios";

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch friends when the component mounts
  useEffect(() => {
    fetchFriends();
  }, []);

  // Function to fetch friends from the backend
  const fetchFriends = async () => {
    try {
      const response = await axios.get("/api/friends"); // Replace with your backend route
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error.message);
      setError("Failed to fetch friends.");
    }
  };

  // Function to add a new friend
  const addFriend = async () => {
    if (!friendName.trim()) {
      setError("Friend name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/api/friends", { name: friendName }); // Replace with your backend route
      setSuccessMessage(response.data.message || "Friend added successfully!");
      setFriendName(""); // Clear input
      fetchFriends(); // Refresh the friends list
    } catch (error) {
      console.error("Error adding friend:", error.message);
      setError(error.response?.data?.message || "Failed to add friend.");
    }
  };

  // Function to delete a friend
  const deleteFriend = async (id) => {
    try {
      const response = await axios.delete(`/api/friends/${id}`); // Replace with your backend route
      setSuccessMessage(response.data.message || "Friend deleted successfully!");
      fetchFriends(); // Refresh the friends list
    } catch (error) {
      console.error("Error deleting friend:", error.message);
      setError("Failed to delete friend.");
    }
  };

  return (
    <div className="friend-container">
      <h1>Friends List</h1>

      {/* Display messages */}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {/* Add Friend */}
      <div className="add-friend">
        <input
          type="text"
          placeholder="Enter friend's name"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>

      {/* Friends List */}
      <ul>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend._id}>
              {friend.name}
              <button onClick={() => deleteFriend(friend._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No friends found. Add a new one!</p>
        )}
      </ul>
    </div>
  );
};

export default Friend;
