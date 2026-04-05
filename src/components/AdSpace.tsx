import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  className = '',
  placeholder,
  showPlaceholder = false
}: AdSpaceProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  if (!showPlaceholder) {
    return null;
  }

  return (
    <motion.div
      className={`
        ${getSizeClasses()}
        bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {placeholder || getPlaceholderText()}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
          {placement || 'Ad Space'}
        </span>
      </div>
      <div className="absolute top-1 right-1 text-[8px] text-slate-400 bg-slate-200/70 dark:bg-slate-700/70 px-1 rounded">
        Ad
      </div>
    </motion.div>
  );
};

export default AdSpace;