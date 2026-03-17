import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import { getLocalizedContent, SanityArticle } from "@/lib/sanity";
import { OptimizedImage } from "@/components/OptimizedImage";
import { cn } from "@/lib/utils";

interface ProfessionalArticleCardProps {
  article: SanityArticle;
  variant?: 'default' | 'horizontal' | 'minimal';
  showAuthor?: boolean;
  showExcerpt?: boolean;
  imageSize?: 'small' | 'medium' | 'large';
  className?: string;
}

const ProfessionalArticleCard = ({
  article,
  variant = 'default',
  showAuthor = true,
  showExcerpt = true,
  imageSize = 'medium',
  className
}: ProfessionalArticleCardProps) => {
  const imageSizes = {
    small: 'h-48',
    medium: 'h-56',
    large: 'h-72'
  };

  if (variant === 'horizontal') {
    return (
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={cn("group", className)}
      >
        <Link to={`/stories/${article.slug?.current || article._id}`}>
          <div className="flex gap-6 items-start">
            <div className="w-2/5 aspect-[4/3] overflow-hidden rounded-sm">
              <OptimizedImage
                image={article.mainImage}
                alt={getLocalizedContent(article.title) || article.title}
                preset="card"
                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                </div>
                {article.readTime && (
                  <>
                    <span>·</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime} min
                    </div>
                  </>
                )}
              </div>
              <h3 className="font-secondary text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                {getLocalizedContent(article.title) || article.title}
              </h3>
              {showExcerpt && article.excerpt && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {getLocalizedContent(article.excerpt) || article.excerpt}
                </p>
              )}
              {showAuthor && article.author && (
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">By</span>
                  <span className="ml-1 font-medium">{article.author.name}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'minimal') {
    return (
      <motion.article
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className={cn("group", className)}
      >
        <Link to={`/stories/${article.slug?.current || article._id}`}>
          <div className="flex items-start gap-4">
            <div className="text-3xl font-secondary font-bold text-muted-foreground/30">
              {format(new Date(article.publishedAt), 'dd')}
            </div>
            <div className="flex-1 border-l pl-4">
              <div className="text-xs text-muted-foreground mb-1">
                {format(new Date(article.publishedAt), 'MMMM yyyy')}
              </div>
              <h3 className="font-secondary font-bold group-hover:text-accent transition-colors">
                {getLocalizedContent(article.title) || article.title}
              </h3>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Link to={`/stories/${article.slug?.current || article._id}`}>
        <div className="overflow-hidden rounded-sm border border-transparent hover:border-border transition-colors">
          <div className={cn("overflow-hidden", imageSizes[imageSize])}>
            <OptimizedImage
              image={article.mainImage}
              alt={getLocalizedContent(article.title) || article.title}
              preset="card"
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(article.publishedAt), 'MMM d, yyyy')}
              </div>
              {article.readTime && (
                <>
                  <span>·</span>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime} min
                  </div>
                </>
              )}
            </div>
            
            <h3 className="font-secondary text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {getLocalizedContent(article.title) || article.title}
            </h3>
            
            {showExcerpt && article.excerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {getLocalizedContent(article.excerpt) || article.excerpt}
              </p>
            )}
            
            {showAuthor && article.author && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                    <span className="text-xs font-semibold">
                      {article.author.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    {article.author.role && (
                      <p className="text-xs text-muted-foreground">{article.author.role}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProfessionalArticleCard;