import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { generateProfileDocument } from '../services/documentService';
import ReviewForm from '../components/ReviewForm';

function ProfileDetailPage() {
  const [profile, setProfile] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [reviews, setReviews] = useState([]);
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

  const fetchReviews = useCallback(async () => {
    try {
      const data = await apiRequest(`/profiles/${id}/reviews`);
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
    fetchReviews();
  }, [fetchProfile, fetchReviews]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await apiRequest(`/profiles/${id}`, 'DELETE');
        navigate('/profiles');
      } catch (error) {
        alert('Failed to delete profile. Please try again.');
      }
    }
  };

  const handleGenerateDocument = async () => {
    try {
      const url = await generateProfileDocument(id);
      setDocumentUrl(url);
    } catch (error) {
      alert('Failed to generate document. Please try again.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Industry: {profile.industry}</p>
      <p>Description: {profile.description}</p>
      <Link to={`/profiles/${id}/edit`}>Edit Profile</Link>
      <button onClick={handleDelete}>Delete Profile</button>
      <button onClick={handleGenerateDocument}>Generate Document</button>
      {documentUrl && (
        <a href={documentUrl} target="_blank" rel="noopener noreferrer">
          Download Generated Document
        </a>
      )}
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review._id}>
          <p>Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
      <ReviewForm profileId={id} onReviewAdded={fetchReviews} />
    </div>
  );
}

export default ProfileDetailPage;
