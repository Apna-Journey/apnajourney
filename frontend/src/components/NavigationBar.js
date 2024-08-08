import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

function NavigationBar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: '#f0f0f0', padding: '10px' }}>
      <span style={{ fontWeight: 'bold' }}>Apna Journey</span>
      <ul style={{ listStyle: 'none', display: 'inline-block', marginLeft: '20px' }}>
        <li style={{ display: 'inline', marginRight: '10px' }}><Link to="/">Home</Link></li>
        <li style={{ display: 'inline', marginRight: '10px' }}><Link to="/profiles">Profiles</Link></li>
        {user && (
          <>
            <li style={{ display: 'inline', marginRight: '10px' }}><Link to="/dashboard">Dashboard</Link></li>
            <li style={{ display: 'inline', marginRight: '10px' }}>Welcome, {user.name}</li>
            <li style={{ display: 'inline' }}><button onClick={logout}>Logout</button></li>
          </>
        )}
        {!user && (
          <>
            <li style={{ display: 'inline', marginRight: '10px' }}><Link to="/login">Login</Link></li>
            <li style={{ display: 'inline' }}><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;




