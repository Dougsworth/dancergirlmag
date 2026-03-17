// src/lib/sanity/utils/image.ts
// Optimized image utilities - balanced quality and performance

import { urlFor } from '../client';
import type { SanityImage } from '../types';

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  dpr?: number;
  blur?: number;
  sharpen?: number;
}

/**
 * Generate an optimized image URL
 */
export function getOptimizedImageUrl(
  image: SanityImage | undefined | null,
  options: ImageOptions = {}
): string {
  if (!image || !urlFor(image)) {
    return '/DG Monogram Letters ONLY Digital Black.png';
  }

  const {
    width = 1200,
    height,
    quality = 80,
    format = 'webp',
    fit = 'clip',
    dpr = 1,
    blur = 0,
    sharpen = 0
  } = options;

  let imageBuilder = urlFor(image)!
    .width(width)
    .quality(quality)
    .format(format)
    .fit(fit)
    .dpr(dpr)
    .auto('format');

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  if (blur > 0) {
    imageBuilder = imageBuilder.blur(blur);
  }

  if (sharpen > 0) {
    imageBuilder = imageBuilder.sharpen(sharpen);
  }

  return imageBuilder.url() || '/DG Monogram Letters ONLY Digital Black.png';
}

/**
 * Generate responsive image srcset for different screen sizes
 */
export function getResponsiveImageSrcSet(
  image: SanityImage | undefined | null,
  options: Omit<ImageOptions, 'width'> = {}
): string {
  if (!image || !urlFor(image)) {
    return '';
  }

  const breakpoints = [640, 768, 1024, 1280, 1920];
  const quality = options.quality || 80;

  return breakpoints
    .map(width => {
      const url = getOptimizedImageUrl(image, { ...options, width, quality });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Get image dimensions maintaining aspect ratio
 */
export function getImageDimensions(
  width: number,
  aspectRatio: number = 16/9
): { width: number; height: number } {
  return {
    width,
    height: Math.round(width / aspectRatio)
  };
}

/**
 * Presets for common image use cases
 */
export const imagePresets = {
  hero: {
    width: 1920,
    height: 1080,
    quality: 80,
    format: 'webp' as const,
    dpr: 1,
  },

  featured: {
    width: 1200,
    height: 675,
    quality: 80,
    format: 'webp' as const,
    dpr: 1,
  },

  gallery: {
    width: 800,
    quality: 80,
    format: 'webp' as const,
    dpr: 1,
  },

  card: {
    width: 600,
    height: 450,
    quality: 75,
    format: 'webp' as const,
    dpr: 1,
  },

  profile: {
    width: 400,
    height: 400,
    quality: 80,
    format: 'webp' as const,
    fit: 'crop' as const,
    dpr: 1,
  },

  full: {
    width: 1920,
    quality: 85,
    format: 'webp' as const,
    dpr: 1,
  }
};

/**
 * Get image with preset
 */
export function getHDImage(
  image: SanityImage | undefined | null,
  preset: keyof typeof imagePresets = 'featured'
): string {
  return getOptimizedImageUrl(image, imagePresets[preset]);
}

/**
 * Progressive image loading with blur placeholder
 */
export function getBlurredPlaceholder(
  image: SanityImage | undefined | null
): string {
  return getOptimizedImageUrl(image, {
    width: 20,
    quality: 30,
    blur: 50,
    format: 'webp'
  });
}
