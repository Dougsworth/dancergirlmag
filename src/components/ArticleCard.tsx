import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  image: string;
  category: string;
  excerpt?: string;
  slug?: string;
  isLarge?: boolean;
  className?: string;
}

const ArticleCard = ({
  title,
  image,
  category,
  excerpt,
  slug,
  isLarge = false,
  className = "",
}: ArticleCardProps) => {
  const CardWrapper = slug ? Link : "div";
  const cardProps = slug ? { to: `/article/${slug}` } : {};

  return (
    <CardWrapper {...cardProps}>
      <Card
        className={`group cursor-pointer hover:shadow-magazine transition-all duration-300 hover:-translate-y-1 ${className}`}
      >
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isLarge ? "h-64 md:h-80" : "h-48"
            }`}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {category}
            </span>
          </div>
        </div>

        <CardContent className="p-6">
          <h3
            className={`font-primary font-semibold text-foreground group-hover:text-mocha-brown transition-colors leading-snug ${
              isLarge ? "text-lg md:text-xl mb-2" : "text-base mb-2"
            }`}
          >
            {title}
          </h3>

          {excerpt && (
            <p className="font-body text-muted-foreground leading-relaxed text-sm">
              {excerpt}
            </p>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default ArticleCard;
