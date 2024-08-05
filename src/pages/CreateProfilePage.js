import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    industry: '',
    description: '',
    foundedYear: '',
    employees: '',
    website: '',
    location: ''
  });
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('industry', profile.industry);
    formData.append('description', profile.description);
    formData.append('foundedYear', profile.foundedYear);
    formData.append('employees', profile.employees);
    formData.append('website', profile.website);
    formData.append('location', profile.location);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      // Upload the profile data and file
      await apiRequest('/profiles', 'POST', formData, true);
      // Navigate to the profile preview page
      navigate('/preview-profile');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Company Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Company Name:</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="industry" className="form-label">Industry:</label>
          <input 
            type="text" 
            className="form-control" 
            id="industry" 
            name="industry" 
            value={profile.industry} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea 
            className="form-control" 
            id="description" 
            name="description" 
            value={profile.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="foundedYear" className="form-label">Founded Year:</label>
          <input 
            type="number" 
            className="form-control" 
            id="foundedYear" 
            name="foundedYear" 
            value={profile.foundedYear} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employees" className="form-label">Number of Employees:</label>
          <input 
            type="number" 
            className="form-control" 
            id="employees" 
            name="employees" 
            value={profile.employees} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website:</label>
          <input 
            type="url" 
            className="form-control" 
            id="website" 
            name="website" 
            value={profile.website} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input 
            type="text" 
            className="form-control" 
            id="location" 
            name="location" 
            value={profile.location} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Logo:</label>
          <input 
            type="file" 
            className="form-control" 
            id="logo" 
            name="logo" 
            onChange={handleFileChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfilePage;
