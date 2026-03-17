import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MagazineSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
  variant?: 'default' | 'dark' | 'accent';
}

const MagazineSection = ({
  title,
  subtitle,
  children,
  viewAllLink,
  viewAllText = "View All",
  className,
  variant = 'default'
}: MagazineSectionProps) => {
  const variants = {
    default: "bg-background",
    dark: "bg-foreground text-background",
    accent: "bg-muted"
  };

  return (
    <section className={cn(variants[variant], "py-16 lg:py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className={cn(
                "text-3xl lg:text-4xl font-secondary font-bold",
                variant === 'dark' && "text-background"
              )}>
                {title}
              </h2>
              {subtitle && (
                <p className={cn(
                  "mt-2 text-lg",
                  variant === 'dark' ? "text-background/70" : "text-muted-foreground"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className={cn(
                  "group flex items-center text-sm font-medium transition-colors",
                  variant === 'dark' 
                    ? "text-background/70 hover:text-background" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {viewAllText}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default MagazineSection;