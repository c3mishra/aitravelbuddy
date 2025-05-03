const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} = require('../controllers/userController');

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post('/', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private (would be protected in a real app)
router.put('/:id', updateUserProfile);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin (would be protected in a real app)
router.delete('/:id', deleteUser);

module.exports = router;