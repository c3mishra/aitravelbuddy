const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const itineraryRoutes = require('./src/routes/itineraryRoutes');
const commentRoutes = require('./src/routes/commentRoutes');

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TravelBuddy API' });
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 