// src/lib/sanity/queries/featured-stories.ts
// Featured stories queries

import { sanityFetch } from '../client';
import type { SanityFeaturedStory } from '../types';

// ==================== FEATURED STORIES ====================

/**
 * Get all featured stories
 */
export async function getFeaturedStories(params?: {
  limit?: number;
  featured?: boolean;
}): Promise<SanityFeaturedStory[]> {
  const { limit = 10, featured } = params || {};
  
  const filters = [
    '_type == "featuredStory"',
    ...(featured ? ['featured == true'] : []),
  ];
  
  const query = `*[${filters.join(' && ')}] | order(order asc, publishedAt desc)[0...${limit}] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    mainImage,
    heroImage,
    gallery,
    publishedAt,
    body,
    featured,
    order
  }`;

  return await sanityFetch<SanityFeaturedStory[]>(query);
}

/**
 * Get a single featured story by slug
 */
export async function getFeaturedStoryBySlug(slug: string): Promise<SanityFeaturedStory | null> {
  const query = `*[_type == "featuredStory" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    mainImage,
    heroImage,
    gallery,
    publishedAt,
    body,
    featured,
    order
  }`;

  try {
    const result = await sanityFetch<SanityFeaturedStory>(query, { slug });
    return result;
  } catch (error) {
    console.error('Error fetching featured story:', error);
    return null;
  }
}

/**
 * Get the primary featured story (highest priority)
 */
export async function getPrimaryFeaturedStory(): Promise<SanityFeaturedStory | null> {
  const stories = await getFeaturedStories({ limit: 1, featured: true });
  return stories[0] || null;
}