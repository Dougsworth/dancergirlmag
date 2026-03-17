import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import { getLocalizedContent, SanityArticle } from "@/lib/sanity";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/OptimizedImage";

interface StoryCardProps {
  article: SanityArticle;
  index: number;
  featured?: boolean;
}


// Function to remove category prefix from title
const getCleanTitle = (title: string, categories?: Array<{title: string | Record<string, string>}>) => {
  if (!categories || categories.length === 0) return title;
  
  const categoryTitle = getLocalizedContent(categories[0].title) || (typeof categories[0].title === 'string' ? categories[0].title : '');
  const titleText = title;
  
  // Ensure both are strings before comparing
  if (typeof categoryTitle !== 'string' || typeof titleText !== 'string') {
    return titleText;
  }
  
  // Remove category prefix if it exists at the beginning of the title
  if (titleText.toLowerCase().startsWith(categoryTitle.toLowerCase() + ': ')) {
    return titleText.substring(categoryTitle.length + 2); // +2 for ": "
  }
  
  return titleText;
};

export default function StoryCard({ article, index, featured = false }: StoryCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const
      }
    }
  };

  const overlayVariants = {
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const iconVariants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <Link
        to={`/stories/${article.slug?.current || article._id}`}
        className="block"
      >
        <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/20">
          {/* Image Container */}
          <div className={`relative overflow-hidden ${featured ? 'h-48 md:h-64 lg:h-72' : 'h-48'}`}>
            <motion.div 
              className="w-full h-full"
              variants={imageVariants}
            >
              <OptimizedImage
                image={article.mainImage}
                alt={getLocalizedContent(article.title) || article.title}
                className="w-full h-full"
                preset={featured ? 'featured' : 'card'}
                objectFit="cover"
                priority={index < 3}
                sizes={featured ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0"
              variants={overlayVariants}
            />
            
            {/* Category Badge */}
            {article.categories && article.categories.length > 0 && (
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="secondary" 
                  className="bg-background/90 backdrop-blur-sm text-foreground border-0 font-medium"
                >
                  {getLocalizedContent(article.categories[0].title) || article.categories[0].title}
                </Badge>
              </div>
            )}
            
            {/* Read Time Badge */}
            {article.readTime && (
              <div className="absolute top-4 right-4">
                <Badge 
                  variant="outline" 
                  className="bg-background/90 backdrop-blur-sm border-border/50 text-muted-foreground"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime} min
                </Badge>
              </div>
            )}
            
            {/* Hover Arrow */}
            <motion.div
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
              variants={overlayVariants}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                <motion.div variants={iconVariants}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className={`p-5 ${featured ? 'md:p-7' : ''}`}>
            <motion.h2
              className={`font-secondary font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 ${
                featured ? 'text-2xl md:text-3xl' : 'text-lg'
              }`}
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {getCleanTitle(getLocalizedContent(article.title) || (typeof article.title === 'string' ? article.title : ''), article.categories)}
            </motion.h2>
            
            {article.excerpt && (
              <p className={`text-foreground/65 dark:text-foreground/60 mb-4 line-clamp-3 leading-relaxed ${
                featured ? 'text-[0.95rem]' : 'text-[0.9rem]'
              }`}>
                {getLocalizedContent(article.excerpt) || article.excerpt}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time dateTime={article.publishedAt}>
                    {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                  </time>
                </div>
              </div>
              
              <motion.div className="text-primary font-medium">
                Read more
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}