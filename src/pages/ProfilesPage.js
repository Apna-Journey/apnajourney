import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

function ProfilesPage() {
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
    <div>
      <h1>Company Profiles</h1>
      <input 
        type="text" 
        placeholder="Search profiles" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
        <option value="">All Industries</option>
        <option value="tech">Tech</option>
        <option value="finance">Finance</option>
        <option value="healthcare">Healthcare</option>
        {/* Add more industries as needed */}
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="createdAt">Date Created</option>
      </select>

      {profiles.map(profile => (
        <div key={profile._id}>
          <h2>{profile.name}</h2>
          <p>Industry: {profile.industry}</p>
          <Link to={`/profiles/${profile._id}`}>View Details</Link>
        </div>
      ))}
      
      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
      
      <div>
        <Link to="/">
          <button>Create Profile</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilesPage;




