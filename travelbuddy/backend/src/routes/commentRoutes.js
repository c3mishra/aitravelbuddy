const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByItinerary,
  getCommentById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', createComment);

// @route   GET /api/comments/itinerary/:itineraryId
// @desc    Get comments for an itinerary
// @access  Public
router.get('/itinerary/:itineraryId', getCommentsByItinerary);

// @route   GET /api/comments/:id
// @desc    Get comment by ID
// @access  Public
router.get('/:id', getCommentById);

// @route   PUT /api/comments/:id
// @desc    Update comment
// @access  Private
router.put('/:id', updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete comment
// @access  Private
router.delete('/:id', deleteComment);

module.exports = router; 