import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import AddFriendForm from './AddFriendForm';

// Now this task is done, and I suppose, after sending the ad friend, when the username logs into the same account she should be able to see the friend request option. But as the current interface of home jsx component, I dont see an option available to view the friend request. And as there are many unused components left, like dashboard, etc, use some of those dashboards to integrate with the home jsx in the simplified way that not the existing home jsex do not get disturbed by keeping the structure as it is just adding the new feature and component in the home. Jsx component to display the friend requests and also provide the option of accepting and rejecting those friend requests. And there should be an option where it will show the users sent friend invites and where they will be able to cheque the status of whether they are friend request is accepted or not

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
      const response = await axios.get('/users/search', {
        params: {
          username: searchQuery,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  const handleAddFriend = async (username) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token); // Log the token variable
      const response = await axios.post('/friends/add', { username }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error adding friend');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-4 mb-6">
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
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          {user && token ? `Welcome, ${user.username}!` : 'Welcome, Guest!'}
        </h2>

        {user && token ? (
          <div>
            {/* Friends List */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Your Friends</h3>
              <ul className="space-y-2">
                {friends.length > 0 ? (
                  friends.map(friend => (
                    <li key={friend.id} className="flex justify-between items-center p-4 bg-white bg-opacity-30 rounded-lg">
                      <span className="text-white font-medium">{friend.username}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-white">No friends added yet. Start by searching!</p>
                )}
              </ul>
            </div>

            {/* Search for Friends */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Search for Friends</h3>
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
              </div>
              <ul>
                {searchResults.length > 0 ? (
                  searchResults.map((user) => (
                    <li key={user._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
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
            <p className="text-white mb-4">Please log in to access your friends list.</p>
            <button
              onClick={() => navigate('/login')}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login to Continue
            </button>
            <p className="mt-4 text-white">Don't have an account? <a href="/signup" className="text-blue-300">Sign Up</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;