// src/components/AuthForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isSignup }) => {
  const { login, signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(username, password);
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        await login(username, password);
        navigate('/'); // Redirect to home after successful login
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Authentication error', err);
    }
  };

//   return (
//     <div className="auth-form">
//       <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
//       </form>
//     </div>
//   );
return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isSignup ? 'Sign Up' : 'Log In'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input */}
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition duration-300"
        >
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
    </div>
  </div>
);

};


export default AuthForm;
