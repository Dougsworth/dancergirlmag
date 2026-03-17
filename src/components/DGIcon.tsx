import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DGIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  xs: "w-4 h-4",
  sm: "w-6 h-6", 
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20"
};

/**
 * DGIcon - A consistent placeholder icon using the DG Monogram
 * Used for empty states, loading states, and default content
 */
export const DGIcon = ({
  size = 'md',
  animated = false,
  className,
  onClick,
  ...props
}: DGIconProps) => {
  const dgMonogramSrc = "/DG Monogram Letters ONLY Digital Black.png";
  
  const baseClasses = cn(
    "object-contain flex-shrink-0",
    sizeClasses[size],
    onClick && "cursor-pointer",
    className
  );

  if (animated) {
    return (
      <motion.img
        src={dgMonogramSrc}
        alt="DancerGirl"
        className={baseClasses}
        onClick={onClick}
        animate={{ 
          y: [0, -4, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        {...props}
      />
    );
  }

  return (
    <img
      src={dgMonogramSrc}
      alt="DancerGirl"
      className={baseClasses}
      onClick={onClick}
      {...props}
    />
  );
};

export default DGIcon;