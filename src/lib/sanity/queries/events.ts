// src/lib/sanity/queries/events.ts
// Event-related queries

import { sanityFetch, getLocalizedContent, getCurrentLanguage } from '../client';
import type { SanityEvent, EventQueryParams } from '../types';

// ==================== EVENT QUERIES ====================

/**
 * Get all events with optional filtering
 */
export async function getEvents(params?: EventQueryParams): Promise<SanityEvent[]> {
  const { limit = 100, featured, upcoming, category } = params || {};
  
  const now = new Date().toISOString();
  const filters = [
    '_type == "event"',
    ...(featured ? ['featured == true'] : []),
    ...(upcoming ? ['startDateTime >= $now'] : []),
    ...(category ? ['$category in categories[]->slug.current'] : [])
  ];
  
  const query = `*[${filters.join(' && ')}] | order(startDateTime asc)[0...${limit}] {
    _id,
    _type,
    title,
    slug,
    description,
    startDateTime,
    endDateTime,
    location,
    mainImage,
    ticketUrl,
    featured,
    "categories": categories[]->{title, slug}
  }`;

  const queryParams: Record<string, any> = { limit };
  if (upcoming) queryParams.now = now;
  if (category) queryParams.category = category;

  try {
    const events = await sanityFetch<SanityEvent[]>(query, queryParams);
    
    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return events.map(event => ({
      ...event,
      title: getLocalizedContent(event.title, lang) || event.title,
      description: getLocalizedContent(event.description, lang) || event.description,
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    startDateTime,
    endDateTime,
    location,
    mainImage,
    ticketUrl,
    featured,
    "categories": categories[]->{title, slug}
  }`;

  try {
    const event = await sanityFetch<SanityEvent>(query, { slug });
    if (!event) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...event,
      title: getLocalizedContent(event.title, lang) || event.title,
      description: getLocalizedContent(event.description, lang) || event.description,
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 6): Promise<SanityEvent[]> {
  return getEvents({ limit, upcoming: true });
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit: number = 3): Promise<SanityEvent[]> {
  return getEvents({ limit, featured: true });
}