import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import translation hook
import { apiRequest } from '../services/api';

function ReviewForm({ profileId, onReviewAdded }) {
  const { t } = useTranslation(); // Hook to use translations
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
          <option key={num} value={num}>{num} {t('stars')}</option>
        ))}
      </select>
      <textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t('writeReview')}
        required
      />
      <button type="submit">{t('submitReview')}</button>
    </form>
  );
}

export default ReviewForm;
