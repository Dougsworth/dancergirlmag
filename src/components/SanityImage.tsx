import { DGImage } from "./DGImage";
import { useSanityImage } from "@/hooks/useSanityImage";
import { cn } from "@/lib/utils";

interface SanityImageProps {
  image: any;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
  priority?: 'high' | 'low';
  onClick?: () => void;
}

/**
 * SanityImage - Specialized component for Sanity CMS images with automatic DG Monogram fallback
 */
export const SanityImage = ({
  image,
  alt,
  className,
  fallbackClassName,
  width,
  height,
  quality,
  format,
  priority,
  onClick,
  ...props
}: SanityImageProps) => {
  const { src, alt: imageAlt, isPlaceholder } = useSanityImage(image, {
    width,
    height,
    quality,
    format
  });

  return (
    <DGImage
      src={src}
      alt={alt || imageAlt}
      className={className}
      fallbackClassName={fallbackClassName}
      width={width}
      height={height}
      priority={priority}
      onClick={onClick}
      {...props}
    />
  );
};

export default SanityImage;