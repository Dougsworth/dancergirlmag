import { urlFor } from "@/lib/sanity";

interface UseSanityImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
}

/**
 * Hook for safely handling Sanity images with automatic DG Monogram fallback
 */
export const useSanityImage = (
  sanityImage: any,
  options: UseSanityImageOptions = {}
) => {
  const { width, height, quality = 80, format = 'auto' } = options;
  
  if (!sanityImage) {
    return {
      src: undefined,
      fallbackSrc: "/DG Monogram Letters ONLY Digital Black.png",
      alt: "DancerGirl",
      isPlaceholder: true
    };
  }

  try {
    let imageBuilder = urlFor(sanityImage);
    
    if (width) imageBuilder = imageBuilder.width(width);
    if (height) imageBuilder = imageBuilder.height(height);
    if (quality) imageBuilder = imageBuilder.quality(quality);
    if (format !== 'auto') imageBuilder = imageBuilder.format(format);
    
    const src = imageBuilder.url();
    
    return {
      src,
      fallbackSrc: "/DG Monogram Letters ONLY Digital Black.png",
      alt: sanityImage.alt || "DancerGirl",
      isPlaceholder: false
    };
  } catch (error) {
    console.warn('Error processing Sanity image:', error);
    return {
      src: undefined,
      fallbackSrc: "/DG Monogram Letters ONLY Digital Black.png", 
      alt: "DancerGirl",
      isPlaceholder: true
    };
  }
};

export default useSanityImage;