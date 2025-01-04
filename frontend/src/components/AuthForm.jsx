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

  return (
    <div className="auth-form">
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
