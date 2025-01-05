import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const Home = () => {
  const token = localStorage.getItem('token');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.username) {
      const fetchFriends = async () => {
        try {
          const response = await axios.get('/api/friends');
          setFriends(response.data);
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      };
      fetchFriends();
    }
  }, [user]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/users/search?username=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
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
    <div className="min-h-screen bg-white p-6">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Friendify</h1>
          {user && token ? (
            <button
              onClick={logout}
              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          {user && token ? `Welcome, ${user.username}!` : 'Welcome, Guest!'}
        </h2>

        {user && token ? (
          <div>
            {/* Friends List */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Friends</h3>
              <ul className="space-y-2">
                {friends.length > 0 ? (
                  friends.map(friend => (
                    <li key={friend.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{friend.username}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No friends added yet. Start by searching!</p>
                )}
              </ul>
            </div>

            {/* Search for Friends */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Search for Friends</h3>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Search by username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Search
                </button>
 ```jsx
              </div>
              <ul className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{user.username}</span>
                      <button
                        onClick={() => handleAddFriend(user.username)}
                        className="py-1 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Add Friend
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No results found.</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center mt-6">
            <p className="text-gray-600 mb-4">Please log in to access your friends list.</p>
            <button
              onClick={() => navigate('/login')}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login to Continue
            </button>
            <p className="mt-4 text-gray-600">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;