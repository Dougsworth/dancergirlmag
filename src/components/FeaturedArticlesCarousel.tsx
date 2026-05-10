import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCarouselFeaturedArticles } from "@/lib/sanity/queries/articles";
import { ArrowRight, Calendar } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { SanityImage } from "./SanityImage";
import { Carousel } from "primereact/carousel";
import { motion } from "framer-motion";

function str(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return (v as any)?.en ?? "";
}

const responsiveOptions = [
  { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
  { breakpoint: "768px", numVisible: 2, numScroll: 1 },
  { breakpoint: "560px", numVisible: 1, numScroll: 1 },
];

const FeaturedArticlesCarousel = () => {
  const [articles, setArticles] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCarouselFeaturedArticles(10)
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const articleTemplate = (article: any) => {
    const title = str(article.title);
    const excerpt = str(article.excerpt);

    return (
      <div className="px-3 h-full">
        <Link to={`/stories/${article.slug?.current || article._id}`} className="block h-full">
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <SanityImage
                image={article.mainImage}
                alt={title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                fallbackClassName="w-full h-full bg-muted flex items-center justify-center object-contain p-8"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {article.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                )}
                <span className="text-primary font-medium text-xs">Read More →</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" message="Loading featured articles..." />
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <motion.section
      className="py-16 bg-muted/30 border-t border-border/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-secondary font-bold text-foreground mb-3">
            Featured Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated stories that go beyond the stage — culture, community, and the lives that shape Caribbean dance.
          </p>
        </div>

        {articles.length === 1 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              {articleTemplate(articles[0])}
            </div>
          </div>
        ) : (
          <Carousel
            value={articles}
            numVisible={3}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            itemTemplate={articleTemplate}
            autoplayInterval={5000}
            circular
            className="latest-carousel"
          />
        )}

        <div className="text-center mt-10">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
          >
            View All Featured Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedArticlesCarousel;
