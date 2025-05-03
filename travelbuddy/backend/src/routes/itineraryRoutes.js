const express = require('express');
const router = express.Router();
const {
  createItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
  getItinerariesByUser
} = require('../controllers/itineraryController');

// @route   POST /api/itineraries
// @desc    Create a new itinerary
// @access  Private
router.post('/', createItinerary);

// @route   GET /api/itineraries
// @desc    Get all itineraries, with optional filtering
// @access  Public
router.get('/', getItineraries);

// @route   GET /api/itineraries/:id
// @desc    Get itinerary by ID
// @access  Public
router.get('/:id', getItineraryById);

// @route   PUT /api/itineraries/:id
// @desc    Update itinerary
// @access  Private
router.put('/:id', updateItinerary);

// @route   DELETE /api/itineraries/:id
// @desc    Delete itinerary
// @access  Private
router.delete('/:id', deleteItinerary);

// @route   GET /api/itineraries/user/:userId
// @desc    Get itineraries by user
// @access  Public
router.get('/user/:userId', getItinerariesByUser);

module.exports = router; 