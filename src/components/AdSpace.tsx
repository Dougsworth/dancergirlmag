import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAdsForPlacement, urlFor, type SanityAd } from "@/lib/sanity";

interface AdSpaceProps {
  size?: 'banner' | 'square' | 'sidebar' | 'skyscraper';
  placement?: string;
  currentPage?: string;
  className?: string;
  placeholder?: string;
  showPlaceholder?: boolean;
}

const AdSpace = ({ 
  size = 'banner',
  placement,
  currentPage = 'all',
  className = '', 
  placeholder,
  showPlaceholder = false 
}: AdSpaceProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ads, setAds] = useState<SanityAd[]>([]);
  const [currentAd, setCurrentAd] = useState<SanityAd | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      if (!placement) {
        setIsLoading(false);
        return;
      }

      try {
        const fetchedAds = await getAdsForPlacement(placement, currentPage);
        const filteredAds = fetchedAds.filter(ad => ad.adType === size);
        
        setAds(filteredAds);
        if (filteredAds.length > 0) {
          setCurrentAd(filteredAds[0]); // Show highest priority ad
        }
      } catch (error) {
        console.error('Error loading ads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAds();
  }, [placement, currentPage, size]);

  useEffect(() => {
    // Show ad space after brief delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-24 max-w-4xl';
      case 'square':
        return 'w-64 h-64';
      case 'sidebar':
        return 'w-48 h-96';
      case 'skyscraper':
        return 'w-40 h-[600px]';
      default:
        return 'w-full h-24';
    }
  };

  const getPlaceholderText = () => {
    if (placeholder) return placeholder;
    switch (size) {
      case 'banner':
        return 'Banner Advertisement';
      case 'square':
        return 'Square Ad';
      case 'sidebar':
        return 'Sidebar Ad';
      case 'skyscraper':
        return 'Skyscraper Ad';
      default:
        return 'Advertisement';
    }
  };

  // Don't render if no placement provided and no placeholder
  if (!placement && !showPlaceholder) {
    return null;
  }

  // Don't render if no ads found and no placeholder
  if (isLoading || (!currentAd && !showPlaceholder)) {
    return null;
  }

  const renderAdContent = () => {
    if (!currentAd) return null;

    const { adContent } = currentAd;

    switch (adContent.contentType) {
      case 'html':
        return (
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: adContent.htmlCode || '' }}
          />
        );
      
      case 'image':
        if (adContent.image && adContent.linkUrl) {
          return (
            <a 
              href={adContent.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
              onClick={() => {
                if (currentAd.analytics?.trackingId) {
                  // Track click event
                  console.log('Ad clicked:', currentAd.analytics.trackingId);
                }
              }}
            >
              <img 
                src={urlFor(adContent.image).width(400).height(300).url()}
                alt={currentAd.title}
                className="w-full h-full object-cover"
              />
            </a>
          );
        } else if (adContent.image) {
          return (
            <img 
              src={urlFor(adContent.image).width(400).height(300).url()}
              alt={currentAd.title}
              className="w-full h-full object-cover"
            />
          );
        }
        break;
      
      case 'script':
        if (adContent.scriptSrc) {
          return (
            <div className="w-full h-full flex items-center justify-center">
              <script src={adContent.scriptSrc} async />
              <div className="text-xs text-slate-500">External Ad Loading...</div>
            </div>
          );
        }
        break;
    }
    
    return null;
  };

  return (
    <motion.div
      className={`
        ${getSizeClasses()}
        ${!currentAd ? 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900' : 'bg-white dark:bg-slate-800'}
        border border-slate-300 dark:border-slate-700
        rounded-lg
        flex items-center justify-center
        overflow-hidden
        relative
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.95 
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut" 
      }}
    >
      {/* Ad content container */}
      <div className="w-full h-full relative">
        {/* Sanity ad content */}
        {currentAd && renderAdContent()}

        {/* Placeholder for when no ad is loaded */}
        {(!currentAd && showPlaceholder) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className="w-8 h-8 mb-2 opacity-30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-slate-500">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {getPlaceholderText()}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              {placement || 'Ad Space'}
            </span>
          </div>
        )}

        {/* Fallback for third-party ad networks */}
        {!currentAd && !showPlaceholder && (
          <div 
            id={`adspace-${size}-${Math.random().toString(36).substr(2, 9)}`}
            className="w-full h-full"
          >
            {/* Ad networks will inject content here */}
          </div>
        )}
      </div>

      {/* Subtle "Ad" label - required by most ad networks */}
      {(currentAd || showPlaceholder) && (
        <div className="absolute top-1 right-1 text-[8px] text-slate-400 bg-slate-200/70 dark:bg-slate-700/70 px-1 rounded">
          Ad
        </div>
      )}
    </motion.div>
  );
};

export default AdSpace;