const Itinerary = require('../models/Itinerary');

// @desc    Create new itinerary
// @route   POST /api/itineraries
// @access  Private
const createItinerary = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      tripLength,
      experienceType,
      days,
      images,
      coverImage
    } = req.body;

    // Use a valid MongoDB ObjectId format for testing
    // In a real app, this would come from authenticated user's JWT token
    const userId = "507f1f77bcf86cd799439011"; // This is a valid ObjectId format
    
    // Process days data - remove client-side UUIDs so MongoDB can generate ObjectIds
    const processedDays = days ? days.map(day => {
      // Create a new object without the id field
      const { id, ...dayWithoutId } = day;
      return dayWithoutId;
    }) : [];

    const itinerary = new Itinerary({
      title,
      description,
      location,
      tripLength,
      experienceType,
      user: userId,
      coverImage,
      images: images || [],
      days: processedDays
    });

    const createdItinerary = await itinerary.save();
    res.status(201).json(createdItinerary);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all itineraries
// @route   GET /api/itineraries
// @access  Public
const getItineraries = async (req, res) => {
  try {
    // Add optional filtering
    const filter = {};
    
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }
    
    if (req.query.experienceType) {
      filter.experienceType = req.query.experienceType;
    }
    
    if (req.query.tripLength) {
      filter.tripLength = req.query.tripLength;
    }

    const itineraries = await Itinerary.find(filter).populate('user', 'name profileImage');
    // console.log(itineraries);
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get itinerary by ID
// @route   GET /api/itineraries/:id
// @access  Public
const getItineraryById = async (req, res) => {
  try {
    console.log('ID received:', req.params.id, typeof req.params.id);
    const itinerary = await Itinerary.findById(req.params.id).populate('user', 'name profileImage bio followers following');
    console.log(itinerary);
    if (itinerary) {
      res.json(itinerary);
    } else {
      res.status(404).json({ message: 'Itinerary not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update itinerary
// @route   PUT /api/itineraries/:id
// @access  Private
const updateItinerary = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      tripLength,
      experienceType,
      coverImage,
      images,
      days
    } = req.body;

    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // In a real app, check if user owns this itinerary
    // if (itinerary.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    // Update fields
    itinerary.title = title || itinerary.title;
    itinerary.description = description || itinerary.description;
    itinerary.location = location || itinerary.location;
    itinerary.tripLength = tripLength || itinerary.tripLength;
    itinerary.experienceType = experienceType || itinerary.experienceType;
    
    if (coverImage) {
      itinerary.coverImage = coverImage;
    }
    
    if (images) {
      itinerary.images = images;
    }
    
    if (days) {
      itinerary.days = days;
    }

    const updatedItinerary = await itinerary.save();
    res.json(updatedItinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete itinerary
// @route   DELETE /api/itineraries/:id
// @access  Private
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // In a real app, check if user owns this itinerary
    // if (itinerary.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    await itinerary.deleteOne();
    res.json({ message: 'Itinerary removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get itineraries by user
// @route   GET /api/itineraries/user/:userId
// @access  Public
const getItinerariesByUser = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.params.userId }).populate('user', 'name profileImage');
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
  getItinerariesByUser
}; 