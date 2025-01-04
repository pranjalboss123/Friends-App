// src/components/Home.js
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import AddFriendForm from './AddFriendForm';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch friends list if logged in
    if (user) {
      const fetchFriends = async () => {
        try {
          const response = await axios.get('/friends'); // Fetch friends API
          setFriends(response.data.friends);
        } catch (error) {
          setMessage('Failed to load friends.');
        }
      };
      fetchFriends();
    }
  }, [user]);

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await axios.get(`/users/search?username=${searchQuery}`);
        setSearchResults(response.data.users);
      } catch (error) {
        setMessage('Search failed.');
      }
    }
  };

  const handleAddFriend = (username) => {
    axios.post('/friends/add', { username })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(err => {
        setMessage('Error adding friend');
      });
  };

  return (
    <div className="min-h-screen flex w-screen justify-center items-center bg-gray-50 p-6">
      <div className="max-w-4xl max-h-fit mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-red-600 text-center">
          {user ? `Welcome, ${user.username}` : 'Welcome, Guest'}
        </h2>
        {user ? (
          <div>
            <button 
              onClick={logout} 
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>

            <div className="mt-6">
              <h3 className="text-2xl font-medium">Your Friends</h3>
              <ul className="mt-4 space-y-2">
                {friends.length > 0 ? (
                  friends.map(friend => (
                    <li key={friend.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                      <span>{friend.username}</span>
                    </li>
                  ))
                ) : (
                  <p>No friends added yet. Start by searching!</p>
                )}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-medium">Search for Friends</h3>
              <div className="flex space-x-2 mt-4">
                <input
                  type="text"
                  placeholder="Search by username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <button 
                  onClick={handleSearch}
                  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                  Search
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                      <span>{user.username}</span>
                      <button 
                        onClick={() => handleAddFriend(user.username)}
                        className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Add Friend
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </ul>
            </div>

          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center mt-6">
            <button 
              onClick={() => navigate('/login')} 
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            >
              Login to Continue
            </button>
            <p className="mt-4 text-red-600">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
