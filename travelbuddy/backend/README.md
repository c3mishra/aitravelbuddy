# TravelBuddy Backend

This is the backend API for the TravelBuddy travel itinerary sharing application.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The server will run on port 5000 by default:
   ```
   http://localhost:5000
   ```

## Seeding the Database

To populate the database with sample data:

1. Make sure MongoDB is running
2. Run the seed script:
   ```
   npm run seed
   ```

This will:
- Clear existing data (users, itineraries, comments)
- Create sample users, itineraries, and comments
- Set up proper relationships between entities

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Itineraries
- `GET /api/itineraries` - Get all itineraries
- `GET /api/itineraries/:id` - Get itinerary by ID
- `GET /api/itineraries/user/:userId` - Get itineraries by user
- `POST /api/itineraries` - Create new itinerary
- `PUT /api/itineraries/:id` - Update itinerary
- `DELETE /api/itineraries/:id` - Delete itinerary

### Comments
- `GET /api/comments/itinerary/:itineraryId` - Get comments for an itinerary
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment 