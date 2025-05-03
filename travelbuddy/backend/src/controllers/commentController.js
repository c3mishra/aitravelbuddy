const Comment = require('../models/Comment');
const Itinerary = require('../models/Itinerary');

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { content, itineraryId } = req.body;

    // Check if itinerary exists
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // Create comment
    const comment = new Comment({
      content,
      user: req.body.userId, // In a real app this would come from the token
      itinerary: itineraryId
    });

    const createdComment = await comment.save();

    // Increment comment count on the itinerary
    itinerary.comments += 1;
    await itinerary.save();

    // Populate user data for the response
    await createdComment.populate('user', 'name profileImage');

    res.status(201).json(createdComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get comments for an itinerary
// @route   GET /api/comments/itinerary/:itineraryId
// @access  Public
const getCommentsByItinerary = async (req, res) => {
  try {
    const comments = await Comment.find({ itinerary: req.params.itineraryId })
      .populate('user', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get comment by ID
// @route   GET /api/comments/:id
// @access  Public
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user', 'name profileImage');

    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // In a real app, check if user owns this comment
    // if (comment.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    // Update content
    comment.content = content;

    const updatedComment = await comment.save();
    await updatedComment.populate('user', 'name profileImage');

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // In a real app, check if user owns this comment
    // if (comment.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    // Get itinerary to decrease comment count
    const itinerary = await Itinerary.findById(comment.itinerary);
    
    // Remove comment
    await comment.deleteOne();
    
    // Decrement comment count if itinerary exists
    if (itinerary) {
      itinerary.comments = Math.max(0, itinerary.comments - 1);
      await itinerary.save();
    }

    res.json({ message: 'Comment removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
  getCommentsByItinerary,
  getCommentById,
  updateComment,
  deleteComment
}; 