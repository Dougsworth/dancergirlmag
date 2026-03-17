import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  decorativeIcon?: React.ReactNode;
  alignment?: "left" | "center";
  className?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  decorativeIcon,
  alignment = "center",
  className = ""
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`section-spacing ${alignment === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {decorativeIcon && alignment === "center" && (
        <div className="flex items-center justify-center mb-6">
          {decorativeIcon}
          <h2 className="section-title mx-4">
            {title}
          </h2>
          {decorativeIcon}
        </div>
      )}
      
      {!decorativeIcon && (
        <h2 className="section-title">
          {title}
        </h2>
      )}
      
      {/* Decorative line */}
      <div className={`w-20 h-1 bg-mocha-brown rounded-full mb-6 ${
        alignment === 'center' ? 'mx-auto' : ''
      }`}></div>
      
      {subtitle && (
        <p className="font-body text-muted-foreground max-w-3xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;