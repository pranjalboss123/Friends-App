// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from '../axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token); // Store the token or user data after login
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token to localStorage
      setUser(token); // Update the user state
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
