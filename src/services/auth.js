import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const userData = await apiRequest('/user');
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      logout();
    }
  };

  const register = async (name, email, password) => {
    const data = await apiRequest('/register', 'POST', { name, email, password });
    // Don't set user or token yet, as the email is not verified
    return data;
  };

  const verifyEmail = async (token) => {
    const data = await apiRequest('/verify-email', 'POST', { token });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const data = await apiRequest('/login', 'POST', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
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
