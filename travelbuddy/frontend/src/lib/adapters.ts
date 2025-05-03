/**
 * Adapters to help convert between our frontend models and API models
 * This helps with the migration from mock data to the API
 */

import * as ApiTypes from './api';
import * as FrontendTypes from '@/types';

/**
 * Adapts an API user to the frontend user format
 */
export function adaptUser(apiUser: ApiTypes.User): FrontendTypes.User {
  return {
    id: apiUser._id || '',
    name: apiUser.name,
    email: apiUser.email,
    profileImage: apiUser.profileImage,
    bio: apiUser.bio,
    followers: apiUser.followers || 0,
    following: apiUser.following || 0
  };
}

/**
 * Adapts an API day detail to the frontend day detail format
 */
export function adaptDayDetail(apiDayDetail: ApiTypes.DayDetail): FrontendTypes.DayDetail {
  return {
    id: apiDayDetail.id || crypto.randomUUID(),
    dayNumber: apiDayDetail.dayNumber,
    activities: apiDayDetail.activities,
    accommodation: apiDayDetail.accommodation,
    meals: apiDayDetail.meals,
    notes: apiDayDetail.notes
  };
}

/**
 * Adapts an API itinerary to the frontend itinerary format
 */
export function adaptItinerary(apiItinerary: ApiTypes.Itinerary): FrontendTypes.Itinerary {
  return {
    id: apiItinerary._id || '',
    title: apiItinerary.title,
    description: apiItinerary.description,
    location: apiItinerary.location,
    coverImage: apiItinerary.coverImage,
    images: apiItinerary.images,
    tripLength: apiItinerary.tripLength,
    experienceType: apiItinerary.experienceType,
    userId: apiItinerary.userId || '',
    user: apiItinerary.user ? adaptUser(apiItinerary.user) : undefined,
    likes: apiItinerary.likes || 0,
    comments: apiItinerary.comments || 0,
    days: apiItinerary.days ? apiItinerary.days.map(adaptDayDetail) : [],
    createdAt: apiItinerary.createdAt || new Date().toISOString()
  };
}

/**
 * Adapts an API comment to the frontend comment format
 */
export function adaptComment(apiComment: ApiTypes.Comment): FrontendTypes.Comment {
  return {
    id: apiComment._id || '',
    content: apiComment.content,
    userId: apiComment.userId || '',
    user: apiComment.user ? adaptUser(apiComment.user) : undefined,
    itineraryId: apiComment.itineraryId || '',
    createdAt: apiComment.createdAt || new Date().toISOString()
  };
}

/**
 * Adapts multiple itineraries
 */
export function adaptItineraries(apiItineraries: ApiTypes.Itinerary[]): FrontendTypes.Itinerary[] {
  return apiItineraries.map(adaptItinerary);
}

/**
 * Adapts multiple comments
 */
export function adaptComments(apiComments: ApiTypes.Comment[]): FrontendTypes.Comment[] {
  return apiComments.map(adaptComment);
} 