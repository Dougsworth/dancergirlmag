import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  alignment = "center",
  className = ""
}: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`page-header ${alignment === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      <h1 className="text-page-title">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-page-subtitle">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader; 