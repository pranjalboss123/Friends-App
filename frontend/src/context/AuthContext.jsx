// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from '../axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser  = JSON.parse(user);
      setUser(parsedUser );
      console.log(parsedUser );
      console.log('user:', parsedUser .username);
    } else {
      console.error('Error fetching user data:');
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Save token to localStorage
      // localStorage.setItem('user', user); // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user); // Update the user state
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (username, password) => {
    try {
      await axios.post('/auth/signup', { username, password });
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
