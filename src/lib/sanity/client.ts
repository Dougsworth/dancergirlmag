// src/lib/sanity/client.ts
// Sanity client configuration and basic utilities

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from './types';

// ==================== CLIENT CONFIGURATION ====================

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "f37vktt0";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD, // Use CDN in production
  // Remove token for public read-only queries
  // token: import.meta.env.VITE_SANITY_TOKEN, 
  perspective: "published", // Only fetch published documents
  requestTagPrefix: 'dancergirl',
  ignoreBrowserTokenWarning: true,
  // Remove withCredentials - not needed for public queries
  // withCredentials: true,
});

// ==================== IMAGE BUILDER ====================

const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity image objects
 */
export const urlFor = (source: SanityImage | undefined | null) => {
  if (!source?.asset) {
    return null;
  }
  return builder.image(source);
};

// ==================== QUERY UTILITIES ====================

/**
 * Generic function to fetch data from Sanity with error handling
 */
export async function sanityFetch<T>(
  query: string, 
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params);
    if (!result) {
      // Check if this is a single item query (contains [0] at the end)
      if (query.includes('[0]')) {
        return null as unknown as T;
      }
      return [] as unknown as T;
    }
    return result;
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    throw new Error("Failed to fetch data from Sanity");
  }
}

/**
 * Get current language for internationalization
 */
export function getCurrentLanguage(): 'en' | 'es' {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedLang = localStorage.getItem('i18nextLng');
    return storedLang === 'es' ? 'es' : 'en';
  }
  return 'en';
}

/**
 * Extract localized content based on current language
 */
export function getLocalizedContent(content: any, lang: 'en' | 'es' = getCurrentLanguage()) {
  if (!content) return null;
  if (typeof content === 'string') return content;
  if (content[lang]) return content[lang];
  // Fallback to English if requested language not available
  return content.en || content;
}