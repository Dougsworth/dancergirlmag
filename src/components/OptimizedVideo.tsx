import { useEffect, useRef, useState } from 'react';

interface VideoSource {
  src: string;
  type: string;
}

interface OptimizedVideoProps {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: () => void;
}

export const OptimizedVideo = ({
  sources,
  poster,
  className = "",
  style = {},
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  onLoadStart,
  onCanPlay,
  onError
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      onLoadStart?.();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
      onCanPlay?.();
      
      if (autoPlay) {
        video.play().catch((error) => {
          console.error('Auto-play failed:', error);
        });
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isInView, autoPlay, onLoadStart, onCanPlay, onError]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={className}
        style={style}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        preload="metadata"
      >
        {isInView && sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
      </video>
      
      {/* Loading state */}
      {isInView && isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mb-2"></div>
            <span className="text-white text-xs">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center text-white text-sm">
            <div>Unable to load video</div>
          </div>
        </div>
      )}
      
      {/* Placeholder when not in view */}
      {!isInView && poster && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
    </div>
  );
};