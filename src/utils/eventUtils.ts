// src/utils/eventUtils.ts
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';
import { client, type SanityImage } from '@/lib/sanity';

// Types
export interface Location {
  name?: string;
  address?: string;
  isOnline?: boolean;
  meetingUrl?: string;
  city?: string;
}

export interface SanityEvent {
  _id: string;
  _type: 'event';
  title: string;
  slug: { current: string };
  startDateTime: string;
  endDateTime?: string;
  location?: Location;
  featuredImage?: SanityImage;
  price?: number;
  description?: any[];
  registrationUrl?: string;
  categories?: Array<{ title: string; slug: { current: string } }>;
  registrationRequired?: boolean;
  excerpt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  endTime?: string;
  location: string;
  locationName?: string;
  isOnline: boolean;
  type: string;
  price?: number;
  slug: string;
  featuredImage?: SanityImage;
  excerpt?: string;
  registrationRequired?: boolean;
  registrationUrl?: string;
}

// Convert Sanity events to calendar events
export const convertToCalendarEvents = (sanityEvents: SanityEvent[]): CalendarEvent[] => {
  return sanityEvents.map(event => {
    const startDate = parseISO(event.startDateTime);
    const endDate = event.endDateTime ? parseISO(event.endDateTime) : null;
    
    return {
      id: event._id,
      title: event.title,
      date: format(startDate, 'yyyy-MM-dd'),
      time: format(startDate, 'h:mm a'),
      endTime: endDate ? format(endDate, 'h:mm a') : undefined,
      location: event.location?.isOnline 
        ? 'Online' 
        : event.location?.name || event.location?.city || 'Location TBD',
      locationName: event.location?.name,
      isOnline: event.location?.isOnline || false,
      type: 'event',
      price: event.price,
      slug: event.slug.current,
      featuredImage: event.featuredImage,
      excerpt: event.excerpt,
      registrationRequired: event.registrationRequired,
      registrationUrl: event.registrationUrl
    };
  });
};

// Get events for a specific date
export const getEventsForDate = (events: CalendarEvent[], dateString: string): CalendarEvent[] => {
  return events.filter(event => event.date === dateString);
};

// Get upcoming events (after a specific date)
export const getUpcomingEvents = (
  events: CalendarEvent[], 
  afterDate: string, 
  limit: number = 3
): CalendarEvent[] => {
  return events
    .filter(event => event.date >= afterDate)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, limit);
};

// Get featured events
export const getFeaturedEvents = async (limit: number = 3): Promise<CalendarEvent[]> => {
  try {
    const query = `*[_type == "event" && featured == true] | order(startDateTime asc)[0...$limit] {
      _id, title, slug, startDateTime, endDateTime, location, featuredImage, price, excerpt,
      "categories": categories[]->{title, "slug": slug.current}
    }`;
    const data = await client.fetch<SanityEvent[]>(query, { limit });
    return convertToCalendarEvents(data || []);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
};

// Get event by slug
export const getEventBySlug = async (slug: string): Promise<SanityEvent | null> => {
  try {
    const query = `*[_type == "event" && slug.current == $slug][0] {
      _id, title, slug, startDateTime, endDateTime, location, featuredImage, price, description,
      registrationRequired, registrationUrl, excerpt, "categories": categories[]->{title, "slug": slug.current}
    }`;
    return await client.fetch<SanityEvent>(query, { slug });
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
};

// Get events by category
export const getEventsByCategory = async (categorySlug: string): Promise<CalendarEvent[]> => {
  try {
    const query = `*[_type == "event" && $categorySlug in categories[]->slug.current] | order(startDateTime asc) {
      _id, title, slug, startDateTime, endDateTime, location, featuredImage, price, excerpt
    }`;
    const data = await client.fetch<SanityEvent[]>(query, { categorySlug });
    return convertToCalendarEvents(data || []);
  } catch (error) {
    console.error('Error fetching events by category:', error);
    return [];
  }
};

// Get events within a date range
export const getEventsInRange = async (
  startDate: Date, 
  endDate: Date
): Promise<CalendarEvent[]> => {
  try {
    const query = `*[
      _type == "event" && 
      startDateTime >= $startDate && 
      startDateTime <= $endDate
    ] | order(startDateTime asc) {
      _id, title, slug, startDateTime, endDateTime, location, featuredImage, price, excerpt
    }`;
    
    const data = await client.fetch<SanityEvent[]>(query, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
    
    return convertToCalendarEvents(data || []);
  } catch (error) {
    console.error('Error fetching events in range:', error);
    return [];
  }
};

// Get all unique event years for filtering
export const getEventYears = async (): Promise<number[]> => {
  try {
    const query = `*[_type == "event"]{
      "year": select(startDateTime match "^(\\d{4})" => ^.startDateTime)
    }.year`;
    const years = await client.fetch<string[]>(query);
    return Array.from(new Set(years.map(y => parseInt(y)))).sort((a, b) => b - a);
  } catch (error) {
    console.error('Error fetching event years:', error);
    return [];
  }
};