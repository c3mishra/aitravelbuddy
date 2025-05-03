/**
 * Frontend model type definitions
 */

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface DayDetail {
  _id: string;
  dayNumber: number;
  activities: string;
  accommodation?: string;
  meals?: string;
  notes?: string;
}

export interface Itinerary {
  _id: string;
  title: string;
  description: string;
  location: string;
  coverImage: string;
  images?: string[];
  tripLength: string;
  experienceType: string;
  userId: string;
  user?: User;
  likes: number;
  comments: number;
  days?: DayDetail[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  userId: string;
  user?: User;
  itineraryId: string;
  createdAt: string;
}

export interface ItineraryFilters {
  location?: string;
  tripLength?: string;
  experienceType?: string;
  query?: string;
} 