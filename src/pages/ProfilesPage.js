import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProfiles = useCallback(async () => {
    try {
      const data = await apiRequest(`/profiles?search=${search}&industry=${industry}&sortBy=${sortBy}&page=${page}`);
      setProfiles(data.profiles);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch profiles', error);
    }
  }, [search, industry, sortBy, page]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <div className="container mt-5">
      <h1>Company Profiles</h1>
      
      <div className="mb-3">
        <input 
          type="text" 
          placeholder="Search profiles" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-2"
        />
        <select 
          value={industry} 
          onChange={(e) => setIndustry(e.target.value)}
          className="form-select mb-2"
        >
          <option value="">All Industries</option>
          <option value="tech">Tech</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          {/* Add more industries as needed */}
        </select>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="form-select mb-3"
        >
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="createdAt">Date Created</option>
        </select>
      </div>

      {profiles.length > 0 ? (
        profiles.map(profile => (
          <div key={profile._id} className="mb-4 border p-3">
            <h2>{profile.name}</h2>
            <p><strong>Industry:</strong> {profile.industry}</p>
            <Link to={`/profiles/${profile._id}`} className="btn btn-primary">View Details</Link>
          </div>
        ))
      ) : (
        <p>No profiles available.</p>
      )}

      <div className="mt-4">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
          className="btn btn-secondary me-2"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
          disabled={page === totalPages}
          className="btn btn-secondary ms-2"
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <Link to="/create-profile">
          <button className="btn btn-primary">Create Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilesPage;
