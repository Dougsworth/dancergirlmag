// src/lib/sanity/queries/dancers-of-month.ts
// D.O.M Archive queries

import { sanityFetch } from '../client';
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
    dancerName,
    month,
    year,
    slug,
    socialLinks,
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
    
    return dancers;
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
    dancerName,
    month,
    year,
    slug,
    socialLinks,
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
    return dancer || null;
  } catch (error) {
    console.error('Error fetching dancer of the month by slug:', error);
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
    dancerName,
    month,
    year,
    slug,
    socialLinks,
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
    return dancer || null;
  } catch (error) {
    console.error('Error fetching current dancer of the month:', error);
    return null;
  }
}