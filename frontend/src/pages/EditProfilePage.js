import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

function EditProfilePage() {
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
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const data = await apiRequest(`/profiles/${id}`);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
      await apiRequest(`/profiles/${id}`, 'PUT', formData, true);
      navigate(`/profiles/${id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Company Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={profile.industry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={profile.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="foundedYear">Founded Year:</label>
          <input
            type="text"
            id="foundedYear"
            name="foundedYear"
            value={profile.foundedYear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="employees">Number of Employees:</label>
          <input
            type="number"
            id="employees"
            name="employees"
            value={profile.employees}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={profile.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="logo">Logo:</label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
