import React, { useState } from 'react';
import { apiRequest } from '../services/api';

function ReviewForm({ profileId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest(`/profiles/${profileId}/reviews`, 'POST', { rating, comment });
      onReviewAdded();
      setRating(5);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num} Stars</option>
        ))}
      </select>
      <textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here"
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
