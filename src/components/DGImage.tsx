import { useState } from "react";
import { cn } from "@/lib/utils";

interface DGImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
  onClick?: () => void;
  priority?: 'high' | 'low';
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * DGImage - A smart image component that automatically falls back to DG Monogram
 * when the source image fails to load or is not provided
 */
export const DGImage = ({
  src,
  alt = "DancerGirl",
  className = "w-full h-full object-cover",
  fallbackClassName,
  onClick,
  priority = 'low',
  sizes,
  width,
  height,
  ...props
}: DGImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!!src);

  const shouldShowFallback = !src || hasError;
  const dgMonogramSrc = "/DG Monogram Letters ONLY Digital Black.png";

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (shouldShowFallback) {
    return (
      <img
        src={dgMonogramSrc}
        alt={alt}
        className={cn(
          "object-contain",
          fallbackClassName || className
        )}
        onClick={onClick}
        width={width}
        height={height}
        {...props}
      />
    );
  }

  return (
    <>
      {isLoading && (
        <div className={cn("animate-pulse bg-muted", className)} />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(className, isLoading && "opacity-0")}
        onError={handleError}
        onLoad={handleLoad}
        onClick={onClick}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        sizes={sizes}
        width={width}
        height={height}
        {...props}
      />
    </>
  );
};

export default DGImage;