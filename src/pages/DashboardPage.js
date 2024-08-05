import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { apiRequest } from '../services/api';
import { useAuth } from '../services/auth';
import { exportUserData } from '../services/exportService';

function DashboardPage() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const { user } = useAuth();

  const fetchUserProfiles = useCallback(async () => {
    try {
      const data = await apiRequest('/profiles/user');
      setUserProfiles(data);
    } catch (error) {
      console.error('Failed to fetch user profiles', error);
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      const data = await apiRequest('/user/statistics');
      setStatistics(data);
    } catch (error) {
      console.error('Failed to fetch statistics', error);
    }
  }, []);

  const fetchRecentActivity = useCallback(async () => {
    try {
      const data = await apiRequest('/user/recent-activity');
      setRecentActivity(data);
    } catch (error) {
      console.error('Failed to fetch recent activity', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfiles();
      fetchStatistics();
      fetchRecentActivity();
    }
  }, [user, fetchUserProfiles, fetchStatistics, fetchRecentActivity]);

  const handleExport = async () => {
    try {
      await exportUserData();
    } catch (error) {
      console.error('Failed to export data', error);
    }
  };

  return (
    <div>
      <h1>Your Dashboard</h1>
      <Link to="/create-profile">Create New Profile</Link>
      <button onClick={handleExport}>Export Data</button>

      <h2>Your Profiles</h2>
      {userProfiles.map(profile => (
        <div key={profile._id}>
          <h3>{profile.name}</h3>
          <Link to={`/profiles/${profile._id}`}>View</Link>
          <Link to={`/profiles/${profile._id}/edit`}>Edit</Link>
        </div>
      ))}
      
      <h2>Statistics</h2>
      {statistics && (
        <>
          <ul>
            <li>Total Profiles: {statistics.totalProfiles}</li>
            <li>Profile Views: {statistics.profileViews}</li>
            <li>Document Downloads: {statistics.documentDownloads}</li>
          </ul>
          <BarChart width={600} height={300} data={[
            { name: 'Total Profiles', value: statistics.totalProfiles },
            { name: 'Profile Views', value: statistics.profileViews },
            { name: 'Document Downloads', value: statistics.documentDownloads },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </>
      )}
      
      <h2>Recent Activity</h2>
      <ul>
        {recentActivity.map((activity, index) => (
          <li key={index}>{activity.description} - {new Date(activity.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
