import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

function CreateProfilePage() {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('industry', industry);
    formData.append('description', description);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      await apiRequest('/profiles', 'POST', formData, true);
      navigate('/profiles');
    } catch (error) {
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Company Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="logo">Logo:</label>
          <input
            type="file"
            id="logo"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default CreateProfilePage;

