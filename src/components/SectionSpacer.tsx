import { motion } from "framer-motion";

interface SectionSpacerProps {
  variant?: "dots" | "wave" | "gradient" | "minimal";
  className?: string;
}

const SectionSpacer = ({ variant = "dots", className = "" }: SectionSpacerProps) => {
  const renderSpacer = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex items-center justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );
      
      case "wave":
        return (
          <div className="relative h-8 w-full max-w-xs mx-auto overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-primary/30"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                height: "2px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <div className="absolute inset-0 bg-muted-foreground/20 h-px top-1/2 transform -translate-y-1/2" />
          </div>
        );
      
      case "gradient":
        return (
          <div className="h-px w-full max-w-md mx-auto bg-primary" />
        );
      
      case "minimal":
      default:
        return (
          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-muted-foreground/30" />
            <div className="mx-4 w-1 h-1 bg-primary rounded-full" />
            <div className="h-px w-16 bg-muted-foreground/30" />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`py-16 flex items-center justify-center ${className}`}
    >
      {renderSpacer()}
    </motion.div>
  );
};

export default SectionSpacer;