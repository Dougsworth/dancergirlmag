// src/components/OptimizedImage.tsx
// High-quality, responsive image component with progressive loading

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getOptimizedImageUrl, getResponsiveImageSrcSet, getBlurredPlaceholder, imagePresets } from '@/lib/sanity/utils/image';
import type { SanityImage } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  image: SanityImage | null | undefined;
  alt: string;
  className?: string;
  preset?: keyof typeof imagePresets;
  width?: number;
  height?: number;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  eager?: boolean; // Load immediately without lazy loading
  onLoad?: () => void;
  onClick?: () => void;
  priority?: boolean; // High priority images (above the fold)
  sizes?: string; // Responsive sizes attribute
  fallbackSrc?: string;
}

export function OptimizedImage({
  image,
  alt,
  className,
  preset = 'featured',
  width,
  height,
  quality = 100,
  objectFit = 'cover',
  eager = false,
  onLoad,
  onClick,
  priority = false,
  sizes = '100vw',
  fallbackSrc = '/DG Monogram Letters ONLY Digital Black.png'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (eager || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01 
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [eager]);

  // Get image URLs
  const imageOptions = preset ? imagePresets[preset] : { width, height, quality };
  const src = hasError || !image ? fallbackSrc : getOptimizedImageUrl(image, imageOptions);
  const srcSet = hasError || !image ? undefined : getResponsiveImageSrcSet(image, { quality });
  const placeholderSrc = hasError || !image ? undefined : getBlurredPlaceholder(image);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={cn('relative overflow-hidden bg-gray-100 dark:bg-gray-800', className)}>
      {/* Blurred placeholder */}
      {placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className={cn(
            'absolute inset-0 w-full h-full blur-xl scale-110',
            `object-${objectFit}`
          )}
        />
      )}

      {/* Main image */}
      <motion.img
        ref={imgRef}
        src={isInView ? src : undefined}
        srcSet={isInView ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.02
        }}
        transition={{ 
          duration: 0.4,
          ease: 'easeOut'
        }}
        className={cn(
          'w-full h-full transition-opacity duration-400',
          `object-${objectFit}`,
          onClick && 'cursor-pointer',
          !isLoaded && 'invisible'
        )}
        style={{
          filter: isLoaded ? 'none' : 'blur(8px)',
          transform: isLoaded ? 'none' : 'scale(1.05)'
        }}
      />

      {/* Loading shimmer effect */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
    </div>
  );
}

// Export a simpler version for inline usage
export function HDImage({ 
  image, 
  alt, 
  className,
  preset = 'gallery',
  ...props 
}: Omit<OptimizedImageProps, 'quality'>) {
  return (
    <OptimizedImage
      image={image}
      alt={alt}
      className={className}
      preset={preset}
      quality={100}
      {...props}
    />
  );
}