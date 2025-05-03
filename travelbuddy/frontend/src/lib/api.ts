// Type definitions
export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface DayDetail {
  id?: string;
  dayNumber: number;
  activities: string;
  accommodation?: string;
  meals?: string;
  notes?: string;
}

export interface Itinerary {
  _id?: string;
  title: string;
  description: string;
  location: string;
  coverImage: string;
  images?: string[];
  tripLength: string;
  experienceType: string;
  userId?: string;
  user?: User;
  likes?: number;
  comments?: number;
  days?: DayDetail[];
  createdAt?: string;
}

export interface Comment {
  _id?: string;
  content: string;
  userId?: string;
  user?: User;
  itineraryId?: string;
  itinerary?: string;
  createdAt?: string;
}

export interface ItineraryFilters {
  location?: string;
  tripLength?: string;
  experienceType?: string;
}

// Base API URL
const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || 'Something went wrong';
    throw new Error(errorMessage);
  }
  return response.json();
};

// User API Services
export const userApi = {
  // Get all users
  getAll: async () => {
    const response = await fetch(`${API_URL}/users`);
    return handleResponse(response);
  },
  
  // Get user by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/users/${id}`);
    return handleResponse(response);
  },
  
  // Create a new user (register)
  register: async (userData: { name: string; email: string; password: string; bio?: string }) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
  
  // Update a user
  update: async (id: string, userData: Partial<any>) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
  
  // Delete a user
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
  
  // Login a user
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },
};

// Itinerary API Services
export const itineraryApi = {
  // Create a new itinerary
  create: async (itineraryData: Itinerary) => {
    const response = await fetch(`${API_URL}/itineraries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itineraryData),
    });
    return handleResponse(response);
  },

  // Get all itineraries with optional filtering
  getAll: async (filters: ItineraryFilters = {}) => {
    // Convert filters object to query string
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value as string);
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await fetch(`${API_URL}/itineraries${queryString}`);
    return handleResponse(response);
  },

  // Get itinerary by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/itineraries/${id}`);
    return handleResponse(response);
  },

  // Get itineraries by user
  getByUser: async (userId: string) => {
    const response = await fetch(`${API_URL}/itineraries/user/${userId}`);
    return handleResponse(response);
  },

  // Update itinerary
  update: async (id: string, itineraryData: Partial<Itinerary>) => {
    const response = await fetch(`${API_URL}/itineraries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itineraryData),
    });
    return handleResponse(response);
  },

  // Delete itinerary
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/itineraries/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Comment API Services
export const commentApi = {
  // Create a new comment
  create: async (commentData: Comment) => {
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    return handleResponse(response);
  },

  // Get comments by itinerary
  getByItinerary: async (itineraryId: string) => {
    const response = await fetch(`${API_URL}/comments/itinerary/${itineraryId}`);
    return handleResponse(response);
  },

  // Get comment by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/comments/${id}`);
    return handleResponse(response);
  },

  // Update comment
  update: async (id: string, content: string) => {
    const response = await fetch(`${API_URL}/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    return handleResponse(response);
  },

  // Delete comment
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Get unique values for filters
export const getTripLengths = async () => {
  try {
    const itineraries = await itineraryApi.getAll();
    const lengths = Array.from(new Set(itineraries.map(itinerary => itinerary.tripLength)));
    return lengths;
  } catch (error) {
    console.error('Error fetching trip lengths:', error);
    return ['Weekend', 'Long Weekend', 'Week', '2+ Weeks']; // Fallback default values
  }
};

export const getExperienceTypes = async () => {
  try {
    const itineraries = await itineraryApi.getAll();
    const types = Array.from(new Set(itineraries.map(itinerary => itinerary.experienceType)));
    return types;
  } catch (error) {
    console.error('Error fetching experience types:', error);
    return ['Adventure', 'Cultural', 'Romantic', 'Wellness', 'Family']; // Fallback default values
  }
};

export const getLocations = async () => {
  try {
    const itineraries = await itineraryApi.getAll();
    const locations = Array.from(new Set(itineraries.map(itinerary => itinerary.location)));
    return locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return []; // Empty array fallback
  }
}; 