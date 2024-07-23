import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

function EditProfilePage() {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const data = await apiRequest(`/profiles/${id}`);
      setName(data.name);
      setIndustry(data.industry);
      setDescription(data.description);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest(`/profiles/${id}`, 'PUT', { name, industry, description });
      navigate(`/profiles/${id}`);
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      <h1>Edit Company Profile</h1>
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
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
