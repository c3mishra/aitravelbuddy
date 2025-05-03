const mongoose = require('mongoose');
const { activitySchema } = require('./Activity');

// Day Detail Schema
const dayDetailSchema = mongoose.Schema(
  {
    dayNumber: {
      type: Number,
      required: true,
    },
    activities: [activitySchema],
    accommodation: {
      type: String,
      default: '',
    },
    meals: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const DayDetail = mongoose.model('DayDetail', dayDetailSchema);

module.exports = { dayDetailSchema, DayDetail }; 