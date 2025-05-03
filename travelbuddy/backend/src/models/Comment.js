const mongoose = require('mongoose');

// Comment Schema
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Itinerary',
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment; 