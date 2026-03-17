// src/lib/sanity/queries/founder.ts
// Founder queries

import { sanityFetch, getLocalizedContent, getCurrentLanguage } from '../client';
import type { SanityFounder } from '../types';

// ==================== FOUNDER ====================

/**
 * Get the founder information
 */
export async function getFounder(): Promise<SanityFounder | null> {
  const query = `*[_type == "founder"][0] {
    _id,
    _type,
    name,
    title,
    bio,
    image,
    quote,
    vision,
    email,
    socialLinks,
    achievements
  }`;

  try {
    const founder = await sanityFetch<SanityFounder>(query);
    if (!founder) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...founder,
      name: getLocalizedContent(founder.name, lang) || founder.name,
      title: getLocalizedContent(founder.title, lang) || founder.title,
      bio: getLocalizedContent(founder.bio, lang) || founder.bio,
      quote: getLocalizedContent(founder.quote, lang) || founder.quote,
      vision: getLocalizedContent(founder.vision, lang) || founder.vision,
      achievements: founder.achievements?.map(achievement => ({
        ...achievement,
        achievement: getLocalizedContent(achievement.achievement, lang) || achievement.achievement,
        description: getLocalizedContent(achievement.description, lang) || achievement.description,
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching founder:', error);
    return null;
  }
}