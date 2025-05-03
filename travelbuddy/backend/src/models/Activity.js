const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  image: {
    type: String
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = { activitySchema, Activity };