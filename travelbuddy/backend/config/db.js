const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection function
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from .env or fallback to localhost
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/travelbuddy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 