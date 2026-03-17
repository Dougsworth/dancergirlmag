// src/lib/sanity.types.ts
import type { Image } from '@sanity/types';

// Base image types
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

// Tutorial type
export interface SanityTutorial {
  _id: string;
  _type: 'tutorial';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  excerpt?: string;
  mainImage?: SanityImage;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  danceStyle?: string;
  duration?: number;
  videoUrl?: string;
  publishedAt?: string;
  body?: any[]; // Portable Text
  author?: {
    _ref: string;
    _type: 'reference';
    name?: string;
  };
  featured?: boolean;
}

// Registration type
export interface SanityRegistration {
  _type: 'registration';
  name: string;
  email: string;
  phone?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredStyle?: string;
  tutorial?: {
    _ref: string;
    _type: 'reference';
  };
  newsletterOptIn: boolean;
  submissionDate: string;
  message?: string;
}

// Export types for components
export type Tutorial = SanityTutorial;
export type Registration = SanityRegistration;
