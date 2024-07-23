import { logError, displayErrorMessage } from './errorService';

const API_URL = 'http://localhost:3000/api';

export async function apiRequest(endpoint, method = 'GET', data = null, isFormData = false) {
  try {
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };

    if (data) {
      if (isFormData) {
        options.body = data;
      } else {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    logError(error);
    displayErrorMessage('An error occurred. Please try again later.');
    throw error;
  }
}

