// src/lib/sanity/types.ts
// TypeScript interfaces for all Sanity content types

import type { Image } from '@sanity/types';

// ==================== BASE TYPES ====================

export interface SanityImageAsset {
  _type: 'sanity.imageAsset';
  assetId: string;
  extension: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
  mimeType: string;
  url: string;
}

export interface SanityImage extends Partial<Image> {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// ==================== CONTENT TYPES ====================

export interface SanityArticle {
  _id: string;
  _type: 'article';
  title: string | Record<string, string>;
  slug: SanitySlug;
  publishedAt: string;
  excerpt?: string | Record<string, string>;
  mainImage?: SanityImage;
  body?: any[];
  section?: string;
  author?: string;
  featured?: boolean;
  readTime?: number;
}

export interface SanityDancerOfTheMonth {
  _id: string;
  _type: 'dancerOfTheMonth';
  dancerName: string;
  month: string;
  year: number;
  slug: SanitySlug;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  featuredStory: any[];
  excerpt?: string;
  featuredImage?: SanityImage;
  gallery?: SanityImage[];
  videoHighlights?: Array<{
    title: string;
    videoUrl: string;
    thumbnail?: SanityImage;
    description?: string;
  }>;
  categories?: string[];
  achievements?: Array<{
    achievement: string;
    year: number;
    description?: string;
  }>;
  publishedAt?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityEvent {
  _id: string;
  _type: 'event';
  title: string;
  slug: SanitySlug;
  description?: any[];
  startDateTime: string;
  endDateTime?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    isOnline?: boolean;
    meetingUrl?: string;
  };
  featuredImage?: SanityImage;
  organizer?: string;
  price?: number;
  registrationRequired?: boolean;
  registrationUrl?: string;
  tags?: string[];
}

export interface SanityFounder {
  _id: string;
  _type: 'founder';
  name?: string | Record<string, string>;
  title?: string | Record<string, string>;
  bio?: any[] | Record<string, any[]>;
  image?: SanityImage;
  quote?: string | Record<string, string>;
  vision?: any[] | Record<string, any[]>;
  email?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  achievements?: Array<{
    achievement: string | Record<string, string>;
    year?: number;
    description?: string | Record<string, string>;
  }>;
}

// ==================== EDITOR LETTERS ====================

export interface SanityEditorLetter {
  _id: string;
  _type: 'editorLetter';
  title: string | Record<string, string>;
  slug: SanitySlug;
  mainImage?: SanityImage;
  excerpt?: string | Record<string, string>;
  content?: any[] | Record<string, any[]>;
  publishedAt: string;
  featured?: boolean;
  tags?: string[];
  seoTitle?: string | Record<string, string>;
  seoDescription?: string | Record<string, string>;
  author?: SanityFounder;
}

// ==================== LEGACY TYPES (schemas removed, kept for existing data) ====================

export interface SanityArtist {
  _id: string;
  _type: 'artist';
  name: string | Record<string, string>;
  slug: SanitySlug;
  bio?: string | Record<string, string>;
  profileImage?: SanityImage;
  image?: SanityImage;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  isFeatured?: boolean;
  achievements?: Array<{
    achievement: string;
    year: number;
    description?: string;
  }>;
}

export interface SanityChoreographer {
  _id: string;
  _type: 'choreographer';
  name: string;
  slug: SanitySlug;
  bio?: string;
  profileImage?: SanityImage;
  specialties?: string[];
  featuredWork?: Array<{
    title?: string;
    description?: string;
    videoUrl?: string;
    image?: SanityImage;
    year?: number;
  }>;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };
  featured?: boolean;
  order?: number;
  publishedAt?: string;
}

export interface SanityFeaturedStory {
  _id: string;
  _type: 'featuredStory';
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  publishedAt: string;
  body: any[];
  featured: boolean;
  order?: number;
}

// ==================== PLAYLIST ====================

export interface SanityPlaylist {
  _id: string;
  _type: 'playlist';
  title: string;
  slug: SanitySlug;
  platform: 'spotify' | 'apple' | 'youtube';
  playlistUrl: string;
  coverImage?: SanityImage;
  description?: string;
  tags?: string[];
}

// ==================== QUERY PARAMETERS ====================

export interface ArticleQueryParams {
  limit?: number;
  section?: string;
  featured?: boolean;
  excludeSections?: string[];
}

export interface ArtistQueryParams {
  limit?: number;
  featured?: boolean;
}

export interface ChoreographerQueryParams {
  limit?: number;
  featured?: boolean;
}

export interface EventQueryParams {
  limit?: number;
  featured?: boolean;
  upcoming?: boolean;
}
