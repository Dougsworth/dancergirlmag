import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DGIcon } from "./DGIcon";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fullScreen?: boolean;
  message?: string;
  variant?: "default" | "dg"; // Add DG variant option
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

const LoadingSpinner = ({ 
  size = "md", 
  className, 
  fullScreen = false, 
  message,
  variant = "default"
}: LoadingSpinnerProps) => {
  
  // DG variant with animated monogram
  if (variant === "dg") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
        <DGIcon size={size} animated />
        {message && (
          <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
        )}
      </div>
    );
  }

  const spinner = (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Dancing dots animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              "absolute rounded-full bg-gradient-to-r from-primary to-primary/70",
              size === "sm" && "w-1.5 h-1.5",
              size === "md" && "w-2.5 h-2.5",
              size === "lg" && "w-4 h-4",
              size === "xl" && "w-6 h-6"
            )}
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{
              x: [0, index === 0 ? -20 : index === 1 ? 0 : 20, 0],
              y: [0, index === 1 ? -20 : 0, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Rotating ring */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary",
          size === "xl" && "border-4"
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Pulsing center */}
      <motion.div
        className={cn(
          "absolute inset-0 m-auto rounded-full bg-primary/10",
          size === "sm" && "w-3 h-3",
          size === "md" && "w-5 h-5",
          size === "lg" && "w-8 h-8",
          size === "xl" && "w-12 h-12"
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.2, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center space-y-4">
          {spinner}
          {message && (
            <motion.p
              className="text-muted-foreground font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      {spinner}
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
};

// Simplified inline spinner for buttons and small areas
export const InlineSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin h-4 w-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default LoadingSpinner;