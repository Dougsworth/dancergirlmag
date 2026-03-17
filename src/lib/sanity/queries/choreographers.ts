// src/lib/sanity/queries/choreographers.ts
// Choreographer-related queries

import { sanityFetch } from '../client';
import type { SanityChoreographer, ChoreographerQueryParams } from '../types';

// ==================== CHOREOGRAPHER QUERIES ====================

/**
 * Get all choreographers with optional filtering
 */
export async function getChoreographers(params?: ChoreographerQueryParams): Promise<SanityChoreographer[]> {
  const { limit = 100, featured } = params || {};
  
  const filters = [
    '_type == "choreographer"',
    ...(featured ? ['featured == true'] : []),
  ];
  
  const query = `*[${filters.join(' && ')}] | order(order asc, publishedAt desc)[0...${limit}] {
    _id,
    _type,
    name,
    slug,
    bio,
    profileImage,
    specialties,
    featuredWork,
    socialLinks,
    featured,
    order,
    publishedAt
  }`;

  try {
    const choreographers = await sanityFetch<SanityChoreographer[]>(query);
    return choreographers || [];
  } catch (error) {
    console.error('Error fetching choreographers:', error);
    return [];
  }
}

/**
 * Get a single choreographer by slug
 */
export async function getChoreographerBySlug(slug: string): Promise<SanityChoreographer | null> {
  const query = `*[_type == "choreographer" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    bio,
    profileImage,
    specialties,
    featuredWork,
    socialLinks,
    featured,
    order,
    publishedAt
  }`;

  try {
    const choreographer = await sanityFetch<SanityChoreographer>(query, { slug });
    return choreographer;
  } catch (error) {
    console.error('Error fetching choreographer:', error);
    return null;
  }
}

/**
 * Get featured choreographers
 */
export async function getFeaturedChoreographers(limit: number = 6): Promise<SanityChoreographer[]> {
  return getChoreographers({ limit, featured: true });
}