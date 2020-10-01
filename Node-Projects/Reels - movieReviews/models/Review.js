const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  body: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
