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
  categories?: Array<{
    _id?: string;
    title: string | Record<string, string>;
    slug: SanitySlug;
  }>;
  author?: {
    name: string;
  };
  featured?: boolean;
  readTime?: number;
}

export interface SanityArtist {
  _id: string;
  _type: 'artist';
  name: string | Record<string, string>;
  slug: SanitySlug;
  bio?: string | Record<string, string>;
  profileImage?: SanityImage;
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

export interface SanityDancerOfTheMonth {
  _id: string;
  _type: 'dancerOfTheMonth';
  month: string;
  year: number;
  slug: SanitySlug;
  artist: {
    _id: string;
    name: string | Record<string, string>;
    bio?: string | Record<string, string>;
    image?: SanityImage;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  };
  featuredStory: string | Record<string, string>;
  excerpt?: string | Record<string, string>;
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
    achievement: string | Record<string, string>;
    year: number;
    description?: string | Record<string, string>;
  }>;
  publishedAt?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  seoTitle?: string | Record<string, string>;
  seoDescription?: string | Record<string, string>;
}

export interface SanityEvent {
  _id: string;
  _type: 'event';
  title: string | Record<string, string>;
  slug: SanitySlug;
  description?: string | Record<string, string>;
  startDateTime: string;
  endDateTime?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    isOnline?: boolean;
  };
  mainImage?: SanityImage;
  ticketUrl?: string;
  featured?: boolean;
  categories?: Array<{
    title: string;
    slug: SanitySlug;
  }>;
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

// ==================== QUERY PARAMETERS ====================

export interface ArticleQueryParams {
  limit?: number;
  category?: string;
  featured?: boolean;
  excludeCategories?: string[];
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
  category?: string;
}