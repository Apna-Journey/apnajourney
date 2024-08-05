import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { generateProfileDocument } from '../services/documentService';
import ReviewForm from '../components/ReviewForm';

const ProfileDetailPage = () => {
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
    <div className="container mt-5">
      <h1>{profile.name}</h1>
      <p><strong>Industry:</strong> {profile.industry}</p>
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Founded Year:</strong> {profile.foundedYear}</p>
      <p><strong>Number of Employees:</strong> {profile.employees}</p>
      <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
      <p><strong>Location:</strong> {profile.location}</p>
      {profile.logo && <img src={profile.logo} alt="Logo" width="100" />}

      <div className="mt-3">
        <Link to={`/profiles/${id}/edit`} className="btn btn-secondary me-2">Edit Profile</Link>
        <button className="btn btn-danger me-2" onClick={handleDelete}>Delete Profile</button>
        <button className="btn btn-primary" onClick={handleGenerateDocument}>Generate Document</button>
        {documentUrl && (
          <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-3">
            Download Generated Document
          </a>
        )}
      </div>

      <h2 className="mt-5">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review._id} className="border p-3 mb-2">
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      <ReviewForm profileId={id} onReviewAdded={fetchReviews} />
    </div>
  );
};

export default ProfileDetailPage;
