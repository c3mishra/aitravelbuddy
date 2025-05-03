const mongoose = require('mongoose');
const { dayDetailSchema } = require('./DayDetail');

// Itinerary Schema
const itinerarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    tripLength: {
      type: String,
      required: true,
    },
    experienceType: {
      type: String,
      required: true,
    },
    days: [dayDetailSchema],
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary; 