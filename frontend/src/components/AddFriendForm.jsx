// // src/components/AddFriendForm.js
// import { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from '../axios';

// const AddFriendForm = () => {
//   const { user } = useContext(AuthContext);  // Get the user (token)
//   const [friendUsername, setFriendUsername] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       setMessage('You must be logged in to add friends');
//       return;
//     }
//     try {
//       // Send request to backend to add friend
//       const response = await axios.post('/friends/add', { 
//         username: friendUsername, 
//         token: user // Assuming token is needed for validation
//       });
//       setMessage(response.data.message); // Handle success message from backend
//     } catch (error) {
//       setMessage('Failed to add friend');
//     }
//   };

//   return (
//     <div className="add-friend-form">
//       <h2>Add Friend</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Friend's Username"
//           value={friendUsername}
//           onChange={(e) => setFriendUsername(e.target.value)}
//           required
//         />
//         <button type="submit">Add Friend</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddFriendForm;




// src/components/AddFriendForm.js
import { useState } from 'react';
import axios from '../axios';

const AddFriendForm = () => {
  const [friendUsername, setFriendUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/friends/add', { username: friendUsername });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to add friend');
    }
  };

  return (
    <div className="add-friend-form">
      <h2>Add Friend</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Friend's Username"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
          required
        />
        <button type="submit">Add Friend</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddFriendForm;
