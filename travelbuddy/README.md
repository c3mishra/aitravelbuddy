# TravelBuddy - Travel Itinerary Sharing App

A web-based platform that allows users to create, share, and explore travel itineraries. Users can search for itineraries based on location, trip length, and experience type, as well as like, comment, and save itineraries for future reference.

## Features

- **User Authentication**: Google OAuth integration for seamless login.
- **Itinerary Management**: Create, edit, and delete travel itineraries with photos.
- **Advanced Search**: Filter itineraries by location, trip length, and experience type.
- **User Interactions**: Like, dislike, comment, and save itineraries.
- **User Profiles**: Follow other users and view their shared itineraries.
- **PDF Export**: Export itineraries for offline use.

## Tech Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- React Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Passport.js for Google OAuth
- JWT for authentication
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/travelbuddy.git
cd travelbuddy
```

2. Setup Backend
```bash
cd backend
cp .env.example .env  # Edit this file with your values
npm install
npm run dev
```

3. Setup Frontend
```bash
cd frontend
cp .env.example .env  # Edit this file with your values
npm install
npm run dev
```

4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `GET /api/auth/google`: Google OAuth login
- `GET /api/auth/google/callback`: OAuth callback
- `GET /api/auth/me`: Get current user
- `GET /api/auth/logout`: Logout

### Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `PUT /api/users/:id`: Update user
- `POST /api/users/:id/follow`: Follow a user
- `POST /api/users/:id/unfollow`: Unfollow a user

### Itineraries
- `GET /api/itineraries`: Get all itineraries (with filters)
- `GET /api/itineraries/:id`: Get itinerary by ID
- `POST /api/itineraries`: Create new itinerary
- `PUT /api/itineraries/:id`: Update itinerary
- `DELETE /api/itineraries/:id`: Delete itinerary
- `POST /api/itineraries/:id/like`: Like an itinerary
- `POST /api/itineraries/:id/dislike`: Dislike an itinerary
- `POST /api/itineraries/save`: Save an itinerary
- `DELETE /api/itineraries/save`: Unsave an itinerary
- `GET /api/itineraries/saved/:userId`: Get saved itineraries

### Comments
- `GET /api/comments/itinerary/:itineraryId`: Get comments for an itinerary
- `POST /api/comments`: Create a comment
- `PUT /api/comments/:id`: Update a comment
- `DELETE /api/comments/:id`: Delete a comment

# To run mongodb in codespace use below - 
# docker-compose up -d

## UI Screenshots
<img width="2392" height="1358" alt="image" src="https://github.com/user-attachments/assets/42fb895a-73fa-4d86-b53b-8507f5aeed37" />

<img width="2397" height="1354" alt="image" src="https://github.com/user-attachments/assets/9956d08a-017e-407c-815e-d1bc510398a0" />

<img width="2387" height="1034" alt="image" src="https://github.com/user-attachments/assets/cf7e338d-0343-4ee6-8f57-6f6a06674d3a" />

<img width="2394" height="1355" alt="image" src="https://github.com/user-attachments/assets/b533be41-1ebe-4114-8cf1-7ea63a6ce104" />

<img width="2392" height="1358" alt="image" src="https://github.com/user-attachments/assets/8c691352-c2d6-4942-803b-1bb4615f209e" />

## License

MIT 
