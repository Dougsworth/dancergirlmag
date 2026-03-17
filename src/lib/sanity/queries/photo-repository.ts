// Photo Repository queries for pulling photos from Sanity backend

import { sanityFetch } from '../client';
import type { SanityImage } from '../types';

export interface PhotoRepositoryItem {
  _id: string;
  title: string;
  image: SanityImage;
  description?: string;
  category: string;
  tags?: string[];
  photographer?: string;
  uploadedAt: string;
  featured: boolean;
}

// Base query for photo repository items
const photoRepositoryQuery = `
  _id,
  title,
  image,
  description,
  category,
  tags,
  photographer,
  uploadedAt,
  featured
`;

/**
 * Get all photos from repository with optional filtering
 */
export async function getPhotosFromRepository(options: {
  category?: string;
  featured?: boolean;
  tags?: string[];
  limit?: number;
  offset?: number;
} = {}): Promise<PhotoRepositoryItem[]> {
  const { category, featured, tags, limit = 50, offset = 0 } = options;
  
  let filters = [];
  
  if (category) {
    filters.push(`category == "${category}"`);
  }
  
  if (featured !== undefined) {
    filters.push(`featured == ${featured}`);
  }
  
  if (tags && tags.length > 0) {
    const tagFilters = tags.map(tag => `"${tag}" in tags`).join(' || ');
    filters.push(`(${tagFilters})`);
  }
  
  const whereClause = filters.length > 0 ? `[${filters.join(' && ')}]` : '';
  
  const query = `*[_type == "photoRepository"${whereClause}] | order(uploadedAt desc)[${offset}...${offset + limit}] {
    ${photoRepositoryQuery}
  }`;
  
  return sanityFetch(query);
}

/**
 * Get photos by category
 */
export async function getPhotosByCategory(category: string, limit = 20): Promise<PhotoRepositoryItem[]> {
  return getPhotosFromRepository({ category, limit });
}

/**
 * Get featured photos
 */
export async function getFeaturedPhotos(limit = 10): Promise<PhotoRepositoryItem[]> {
  return getPhotosFromRepository({ featured: true, limit });
}

/**
 * Search photos by tags
 */
export async function searchPhotosByTags(tags: string[], limit = 20): Promise<PhotoRepositoryItem[]> {
  return getPhotosFromRepository({ tags, limit });
}

/**
 * Get photos for specific use cases
 */
export async function getDancerPortraits(limit = 10): Promise<PhotoRepositoryItem[]> {
  return getPhotosByCategory('portraits', limit);
}

export async function getPerformancePhotos(limit = 15): Promise<PhotoRepositoryItem[]> {
  return getPhotosByCategory('performance', limit);
}

export async function getChoreographerPhotos(limit = 10): Promise<PhotoRepositoryItem[]> {
  return getPhotosByCategory('choreographers', limit);
}

export async function getEditorialPhotos(limit = 20): Promise<PhotoRepositoryItem[]> {
  return getPhotosByCategory('editorial', limit);
}

/**
 * Get a single photo by ID
 */
export async function getPhotoById(id: string): Promise<PhotoRepositoryItem | null> {
  const query = `*[_type == "photoRepository" && _id == "${id}"][0] {
    ${photoRepositoryQuery}
  }`;
  
  return sanityFetch(query);
}

/**
 * Get random photos for variety
 */
export async function getRandomPhotos(limit = 5, category?: string): Promise<PhotoRepositoryItem[]> {
  const categoryFilter = category ? ` && category == "${category}"` : '';
  
  const query = `*[_type == "photoRepository"${categoryFilter}] | order(_createdAt desc)[0...100] | order(rand()) [0...${limit}] {
    ${photoRepositoryQuery}
  }`;
  
  return sanityFetch(query);
}

/**
 * Get all available categories
 */
export async function getPhotoCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "photoRepository"].category)`;
  return sanityFetch(query);
}

/**
 * Get all available tags
 */
export async function getPhotoTags(): Promise<string[]> {
  const query = `array::unique(*[_type == "photoRepository"].tags[])`;
  return sanityFetch(query);
}