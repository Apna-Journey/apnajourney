import React, { useState } from 'react';
import { apiRequest } from '../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/auth/forgot-password', 'POST', { email });
      setMessage('Check your email for the password reset link.');
    } catch (error) {
      console.error('Error sending reset link:', error);
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
