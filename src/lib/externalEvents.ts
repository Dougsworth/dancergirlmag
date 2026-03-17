// Fetch dance events from external API (RapidAPI Real-Time Events Search)
// Falls back gracefully if the API key isn't configured

export interface ExternalEvent {
  _id: string;
  title: string;
  slug: { current: string };
  startDateTime: string;
  endDateTime?: string | null;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    isOnline?: boolean;
  };
  excerpt?: string;
  description?: string;
  externalUrl?: string;
  thumbnail?: string;
  source: 'external';
  tags?: string[];
  categories?: Array<{ title: string }>;
  organizer?: { name?: string; _id?: string } | null;
  price?: number | null;
  registrationRequired?: boolean;
  registrationUrl?: string;
  featuredImage?: null;
}

// Caribbean dance search queries to rotate through
const SEARCH_QUERIES = [
  'dance events Caribbean',
  'dance festival Jamaica Trinidad Barbados',
  'dancehall dance workshop Caribbean 2026',
  'contemporary dance performance Caribbean',
];

// Session-level cache so we don't refetch on every navigation
let cachedEvents: ExternalEvent[] | null = null;
let cacheTimestamp = 0;
const CLIENT_CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export async function fetchExternalEvents(): Promise<ExternalEvent[]> {
  // Return client cache if fresh
  if (cachedEvents && Date.now() - cacheTimestamp < CLIENT_CACHE_TTL) {
    return cachedEvents;
  }

  try {
    // Pick a search query (rotate based on day of week)
    const queryIndex = new Date().getDay() % SEARCH_QUERIES.length;
    const query = SEARCH_QUERIES[queryIndex];

    const response = await fetch(`/api/events-search?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      console.warn('External events API returned', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.events || data.events.length === 0) {
      return [];
    }

    // Filter to only events with valid dates
    const validEvents: ExternalEvent[] = data.events.filter((event: ExternalEvent) => {
      if (!event.startDateTime) return false;
      const date = new Date(event.startDateTime);
      return !isNaN(date.getTime());
    });

    // Cache
    cachedEvents = validEvents;
    cacheTimestamp = Date.now();

    return validEvents;
  } catch (error) {
    console.warn('Could not fetch external events:', error);
    return [];
  }
}
