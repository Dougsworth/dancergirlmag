// src/lib/sanity.ts
// REVAMPED: Clean, organized Sanity integration for DancerGirl Magazine
// This file provides backward compatibility while using the new organized structure

// ==================== CORE EXPORTS ====================
// All the organized functionality from the new structure
export * from './sanity/client';
export * from './sanity/types';
export * from './sanity/utils';
export * from './sanity/queries';

// ==================== BACKWARD COMPATIBILITY ====================
// Legacy imports to maintain existing functionality
import {
  // Core utilities
  sanityFetch as coreSanityFetch,
  urlFor as coreUrlFor,
  getLocalizedContent as coreGetLocalizedContent,
  getCurrentLanguage as coreGetCurrentLanguage,
} from './sanity/client';

import {
  calculateReadTime as coreCalculateReadTime,
} from './sanity/utils';

import {
  // Articles
  getArticles as coreGetArticles,
  getArticle as coreGetArticle,
  getFeaturedArticles as coreGetFeaturedArticles,
  getRecentArticles as coreGetRecentArticles,
  getArticlesBySection as coreGetArticlesBySection,
  
  // Artists
  getArtists as coreGetArtists,
  getArtistBySlug as coreGetArtistBySlug,
  getFeaturedArtists as coreGetFeaturedArtists,
  
  // Choreographers
  getChoreographers as coreGetChoreographers,
  getChoreographerBySlug as coreGetChoreographerBySlug,
  getFeaturedChoreographers as coreGetFeaturedChoreographers,
  
  // Events
  getEvents as coreGetEvents,
  getEventBySlug as coreGetEventBySlug,
  getUpcomingEvents as coreGetUpcomingEvents,
  getFeaturedEvents as coreGetFeaturedEvents,
  
  // Featured Stories
  getFeaturedStories as coreGetFeaturedStories,
  getFeaturedStoryBySlug as coreGetFeaturedStoryBySlug,
  getPrimaryFeaturedStory as coreGetPrimaryFeaturedStory,
  
  // D.O.M Archive
  getDancersOfMonth as coreGetDancersOfMonth,
  getDancerOfMonthBySlug as coreGetDancerOfMonthBySlug,
  getCurrentDancerOfMonth as coreGetCurrentDancerOfMonth,
  
  // Founder
  getFounder as coreGetFounder,
  
  // Editor Letters
  getEditorLetters as coreGetEditorLetters,
  getEditorLetterBySlug as coreGetEditorLetterBySlug,
  getFeaturedEditorLetter as coreGetFeaturedEditorLetter,
} from './sanity/queries';

// ==================== LEGACY FUNCTION ALIASES ====================
// These maintain the exact same API as before

// Core utilities
export const sanityFetch = coreSanityFetch;
export const urlFor = coreUrlFor;
export const getLocalizedContent = coreGetLocalizedContent;
export const getCurrentLanguage = coreGetCurrentLanguage;
export const calculateReadTime = coreCalculateReadTime;

// Articles
export const getArticles = coreGetArticles;
export const getArticle = coreGetArticle;
export const getFeaturedArticles = coreGetFeaturedArticles;

// Artists  
export const getArtistBySlug = coreGetArtistBySlug;
export const getFeaturedArtists = coreGetFeaturedArtists;

// Choreographers
export const getChoreographers = coreGetChoreographers;
export const getChoreographerBySlug = coreGetChoreographerBySlug;

// Events
export const getEvents = coreGetEvents;
export const getEventBySlug = coreGetEventBySlug;
export const getFeaturedEvents = coreGetFeaturedEvents;
export const getUpcomingEventsList = coreGetUpcomingEvents; // Legacy alias

// Featured Stories
export const getFeaturedStories = coreGetFeaturedStories;
export const getFeaturedStoryBySlug = coreGetFeaturedStoryBySlug;
export const getPrimaryFeaturedStory = coreGetPrimaryFeaturedStory;

// D.O.M Archive
export const getDancersOfTheMonth = coreGetDancersOfMonth; // Legacy alias
export const getDancerOfTheMonthBySlug = coreGetDancerOfMonthBySlug; // Legacy alias
export const getFeaturedDancerOfTheMonth = coreGetCurrentDancerOfMonth; // Legacy alias

// ==================== STUB FUNCTIONS FOR MISSING FEATURES ====================
// These were in the old file but not implemented in the new structure
// Return empty arrays/null to prevent breaking changes

export async function getGalleryImages(): Promise<any[]> {
  console.warn('getGalleryImages: This feature was removed. Gallery functionality is deprecated.');
  return [];
}

export async function getDancers(): Promise<any[]> {
  console.warn('getDancers: Use getArtists() instead for artist profiles.');
  return coreGetArtists();
}

export async function getDancerBySlug(slug: string): Promise<any> {
  console.warn('getDancerBySlug: Use getArtistBySlug() instead for artist profiles.');
  return coreGetArtistBySlug(slug);
}

// getPlaylists is now a real query, exported from ./sanity/queries/playlists

export async function getTutorials(): Promise<any[]> {
  console.warn('getTutorials: This feature is not yet implemented.');
  return [];
}

export async function getTutorialBySlug(): Promise<any> {
  console.warn('getTutorialBySlug: This feature is not yet implemented.');
  return null;
}

export async function registerForTutorial(): Promise<any> {
  console.warn('registerForTutorial: This feature is not yet implemented.');
  return null;
}

export const getFounder = coreGetFounder;

export async function getHeroVideos(): Promise<any[]> {
  console.warn('getHeroVideos: This feature is not yet implemented.');
  return [];
}

export async function getVideos(): Promise<any[]> {
  console.warn('getVideos: This feature is not yet implemented.');
  return [];
}

export async function getFeaturedVideo(): Promise<any> {
  console.warn('getFeaturedVideo: This feature is not yet implemented.');
  return null;
}

export async function getVideosByCategory(): Promise<any[]> {
  console.warn('getVideosByCategory: This feature is not yet implemented.');
  return [];
}

export async function getVideosByDifficulty(): Promise<any[]> {
  console.warn('getVideosByDifficulty: This feature is not yet implemented.');
  return [];
}

export async function getVideosByDanceStyle(): Promise<any[]> {
  console.warn('getVideosByDanceStyle: This feature is not yet implemented.');
  return [];
}

export async function getAdsForPlacement(): Promise<any[]> {
  console.warn('getAdsForPlacement: This feature is not yet implemented.');
  return [];
}

export async function getActiveAds(): Promise<any[]> {
  console.warn('getActiveAds: This feature is not yet implemented.');
  return [];
}

// Editor Letters
export const getEditorLetters = coreGetEditorLetters;
export const getEditorLetterBySlug = coreGetEditorLetterBySlug;
export const getFeaturedEditorLetter = coreGetFeaturedEditorLetter;

export async function getPodcastAds(): Promise<any[]> {
  console.warn('getPodcastAds: This feature is not yet implemented.');
  return [];
}

export async function getPodcastAdBySlug(): Promise<any> {
  console.warn('getPodcastAdBySlug: This feature is not yet implemented.');
  return null;
}

export async function getPrimaryPodcastAd(): Promise<any> {
  console.warn('getPrimaryPodcastAd: This feature is not yet implemented.');
  return null;
}

export async function getRelatedEvents(): Promise<any[]> {
  console.warn('getRelatedEvents: Use getEvents() with filtering instead.');
  return [];
}

export async function getEventsByCategory(category: string): Promise<any[]> {
  return coreGetEvents({ category });
}

// ==================== MIGRATION GUIDE ====================
/*
🎯 MIGRATION GUIDE FOR DEVELOPERS

The Sanity integration has been reorganized for better maintainability:

OLD STRUCTURE:
- Single 2000+ line file with everything mixed together
- Hard to find specific functions
- Complex interdependencies
- Difficult to maintain

NEW STRUCTURE:
📁 src/lib/sanity/
  ├── index.ts          # Main exports
  ├── client.ts         # Sanity client & utilities  
  ├── types.ts          # All TypeScript interfaces
  ├── utils.ts          # Helper functions
  └── queries/          # Organized by feature
      ├── articles.ts
      ├── artists.ts  
      ├── choreographers.ts
      ├── events.ts
      ├── featured-stories.ts
      └── dancers-of-month.ts

BENEFITS:
✅ Easier to find specific functions
✅ Better TypeScript support  
✅ Cleaner imports
✅ Modular and maintainable
✅ Consistent error handling
✅ Better documentation

RECOMMENDED USAGE:
// Instead of importing everything from one file:
import { getArticles, getArtists } from '@/lib/sanity'

// You can now import by feature:
import { getArticles } from '@/lib/sanity/queries/articles'
import { getArtists } from '@/lib/sanity/queries/artists'

// Or use the main export (current approach still works):
import { getArticles, getArtists } from '@/lib/sanity'
*/