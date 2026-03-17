// src/lib/sanity/queries/artists.ts
// Artist-related queries

import { sanityFetch, getLocalizedContent, getCurrentLanguage } from '../client';
import type { SanityArtist, ArtistQueryParams } from '../types';

// ==================== ARTIST QUERIES ====================

/**
 * Get all artists with optional filtering
 */
export async function getArtists(params?: ArtistQueryParams): Promise<SanityArtist[]> {
  const { limit = 100, featured } = params || {};
  
  const filters = [
    '_type == "artist"',
    ...(featured ? ['isFeatured == true'] : []),
  ];
  
  const query = `*[${filters.join(' && ')}] | order(name asc)[0...${limit}] {
    _id,
    _type,
    name,
    slug,
    bio,
    profileImage,
    socialLinks,
    isFeatured,
    achievements
  }`;

  try {
    const artists = await sanityFetch<SanityArtist[]>(query);
    
    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return artists.map(artist => ({
      ...artist,
      name: getLocalizedContent(artist.name, lang) || artist.name,
      bio: getLocalizedContent(artist.bio, lang) || artist.bio,
    }));
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
}

/**
 * Get a single artist by slug
 */
export async function getArtistBySlug(slug: string): Promise<SanityArtist | null> {
  const query = `*[_type == "artist" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    bio,
    profileImage,
    socialLinks,
    isFeatured,
    achievements
  }`;

  try {
    const artist = await sanityFetch<SanityArtist>(query, { slug });
    if (!artist) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...artist,
      name: getLocalizedContent(artist.name, lang) || artist.name,
      bio: getLocalizedContent(artist.bio, lang) || artist.bio,
    };
  } catch (error) {
    console.error('Error fetching artist:', error);
    return null;
  }
}

/**
 * Get featured artists
 */
export async function getFeaturedArtists(limit: number = 6): Promise<SanityArtist[]> {
  return getArtists({ limit, featured: true });
}