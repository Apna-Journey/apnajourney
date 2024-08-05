import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async (token) => {
    try {
      console.log('Fetching user data with token:', token);
      const userData = await apiRequest('/user');
      setUser(userData);
      console.log('User data fetched successfully:', userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, [fetchUser]);

  const register = async (name, email, password) => {
    try {
      console.log('Registering user with email:', email);
      const data = await apiRequest('/register', 'POST', { name, email, password });
      console.log('User registered with backend:', data);
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const verifyEmail = async (token) => {
    try {
      console.log('Verifying email with token:', token);
      const data = await apiRequest('/verify-email', 'POST', { token });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      console.log('Email verified and user set:', data.user);
      return data.user;
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Logging in with email:', email);
      const data = await apiRequest('/login', 'POST', { email, password });
      console.log('User logged in with backend:', data);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, verifyEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
