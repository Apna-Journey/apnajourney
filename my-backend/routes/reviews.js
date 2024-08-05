const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  profileId: String,
  rating: Number,
  comment: String
});
const Review = mongoose.model('Review', reviewSchema);

// Add a review
router.post('/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = new Review({ profileId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
