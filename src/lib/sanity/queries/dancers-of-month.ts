// src/lib/sanity/queries/dancers-of-month.ts
// D.O.M Archive queries

import { sanityFetch, getLocalizedContent, getCurrentLanguage } from '../client';
import type { SanityDancerOfTheMonth } from '../types';

// ==================== DANCERS OF THE MONTH ====================

/**
 * Get all dancers of the month
 */
export async function getDancersOfMonth(params?: {
  limit?: number;
  featured?: boolean;
  year?: number;
}): Promise<SanityDancerOfTheMonth[]> {
  const { limit = 12, featured, year } = params || {};
  
  const filters = [
    '_type == "dancerOfTheMonth"',
    ...(featured ? ['isFeatured == true'] : []),
    ...(year ? [`year == ${year}`] : []),
  ];
  
  const query = `*[${filters.join(' && ')}] | order(year desc, month desc)[0...${limit}] {
    _id,
    _type,
    month,
    year,
    slug,
    "artist": artist->{
      _id,
      name,
      bio,
      image,
      socialLinks
    },
    featuredStory,
    excerpt,
    featuredImage,
    gallery,
    videoHighlights,
    categories,
    achievements,
    publishedAt,
    isFeatured,
    isActive,
    seoTitle,
    seoDescription
  }`;

  try {
    const dancers = await sanityFetch<SanityDancerOfTheMonth[]>(query);
    
    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return dancers.map(dancer => ({
      ...dancer,
      artist: {
        ...dancer.artist,
        name: getLocalizedContent(dancer.artist.name, lang) || dancer.artist.name,
        bio: getLocalizedContent(dancer.artist.bio, lang) || dancer.artist.bio,
      },
      featuredStory: getLocalizedContent(dancer.featuredStory, lang) || dancer.featuredStory,
      excerpt: getLocalizedContent(dancer.excerpt, lang) || dancer.excerpt,
      seoTitle: getLocalizedContent(dancer.seoTitle, lang) || dancer.seoTitle,
      seoDescription: getLocalizedContent(dancer.seoDescription, lang) || dancer.seoDescription,
      achievements: dancer.achievements?.map(achievement => ({
        ...achievement,
        achievement: getLocalizedContent(achievement.achievement, lang) || achievement.achievement,
        description: getLocalizedContent(achievement.description, lang) || achievement.description,
      })) || [],
    }));
  } catch (error) {
    console.error('Error fetching dancers of the month:', error);
    return [];
  }
}

/**
 * Get a single dancer of the month by slug
 */
export async function getDancerOfMonthBySlug(slug: string): Promise<SanityDancerOfTheMonth | null> {
  const query = `*[_type == "dancerOfTheMonth" && slug.current == $slug][0] {
    _id,
    _type,
    month,
    year,
    slug,
    "artist": artist->{
      _id,
      name,
      bio,
      image,
      socialLinks
    },
    featuredStory,
    excerpt,
    featuredImage,
    gallery,
    videoHighlights,
    categories,
    achievements,
    publishedAt,
    isFeatured,
    isActive,
    seoTitle,
    seoDescription
  }`;

  try {
    const dancer = await sanityFetch<SanityDancerOfTheMonth>(query, { slug });
    if (!dancer) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...dancer,
      artist: {
        ...dancer.artist,
        name: getLocalizedContent(dancer.artist.name, lang) || dancer.artist.name,
        bio: getLocalizedContent(dancer.artist.bio, lang) || dancer.artist.bio,
      },
      featuredStory: getLocalizedContent(dancer.featuredStory, lang) || dancer.featuredStory,
      excerpt: getLocalizedContent(dancer.excerpt, lang) || dancer.excerpt,
      seoTitle: getLocalizedContent(dancer.seoTitle, lang) || dancer.seoTitle,
      seoDescription: getLocalizedContent(dancer.seoDescription, lang) || dancer.seoDescription,
      achievements: dancer.achievements?.map(achievement => ({
        ...achievement,
        achievement: getLocalizedContent(achievement.achievement, lang) || achievement.achievement,
        description: getLocalizedContent(achievement.description, lang) || achievement.description,
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching dancer of the month:', error);
    return null;
  }
}

/**
 * Get current month's dancer
 */
export async function getCurrentDancerOfMonth(): Promise<SanityDancerOfTheMonth | null> {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.toLocaleString('default', { month: 'long' });
  
  const query = `*[_type == "dancerOfTheMonth" && year == ${currentYear} && month == "${currentMonth}"][0] {
    _id,
    _type,
    month,
    year,
    slug,
    "artist": artist->{
      _id,
      name,
      bio,
      image,
      socialLinks
    },
    featuredStory,
    excerpt,
    featuredImage,
    gallery,
    videoHighlights,
    categories,
    achievements,
    publishedAt,
    isFeatured,
    isActive,
    seoTitle,
    seoDescription
  }`;

  try {
    const dancer = await sanityFetch<SanityDancerOfTheMonth>(query);
    if (!dancer) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...dancer,
      artist: {
        ...dancer.artist,
        name: getLocalizedContent(dancer.artist.name, lang) || dancer.artist.name,
        bio: getLocalizedContent(dancer.artist.bio, lang) || dancer.artist.bio,
      },
      featuredStory: getLocalizedContent(dancer.featuredStory, lang) || dancer.featuredStory,
      excerpt: getLocalizedContent(dancer.excerpt, lang) || dancer.excerpt,
      seoTitle: getLocalizedContent(dancer.seoTitle, lang) || dancer.seoTitle,
      seoDescription: getLocalizedContent(dancer.seoDescription, lang) || dancer.seoDescription,
      achievements: dancer.achievements?.map(achievement => ({
        ...achievement,
        achievement: getLocalizedContent(achievement.achievement, lang) || achievement.achievement,
        description: getLocalizedContent(achievement.description, lang) || achievement.description,
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching current dancer of the month:', error);
    return null;
  }
}