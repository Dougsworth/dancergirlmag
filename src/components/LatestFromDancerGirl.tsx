import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Calendar, ArrowRight } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { SanityImage } from "./SanityImage";
import { Carousel } from "primereact/carousel";
import { motion } from "framer-motion";

// ─── helpers ─────────────────────────────────────────────────────────────────

function str(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return (v as any)?.en ?? "";
}


// ─── Category spotlight panel (New Yorker split) ─────────────────────────────

interface SpotlightProps {
  categorySlug: string;
  categoryLabel: string;
  viewAllPath: string;
  imageLeft?: boolean;
  accent?: string;
  bgStyle?: React.CSSProperties;
}

function CategorySpotlight({
  categorySlug,
  categoryLabel,
  viewAllPath,
  imageLeft = false,
  accent = "hsl(var(--primary))",
  bgStyle,
}: SpotlightProps) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles({ limit: 1, section: categorySlug })
      .then((data) => setArticle(data[0] ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="border-t border-border py-12" style={bgStyle}>
        <div className="max-w-6xl mx-auto px-6 animate-pulse flex gap-8">
          <div className="flex-1 h-48 bg-muted rounded" />
          <div className="flex-1 space-y-4 py-4">
            <div className="h-3 bg-muted rounded w-1/3" />
            <div className="h-7 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const title = str(article.title);
  const excerpt = str(article.excerpt);
  const slug = article.slug?.current || article._id;
  const imgUrl = article.mainImage
    ? urlFor(article.mainImage).width(800).height(600).url()
    : null;

  const textCol = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col justify-center px-6 md:px-12 py-12 md:py-16"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: accent }}>
        {categoryLabel}
      </p>
      <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground mb-5">
        {title}
      </h2>
      {excerpt && (
        <p className="text-base leading-[1.85] text-foreground/70 font-body mb-7 max-w-lg">
          {excerpt}
        </p>
      )}
      <div className="flex items-center gap-6">
        <Link
          to={`/article/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
          style={{ color: accent }}
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={viewAllPath}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          View All →
        </Link>
      </div>
    </motion.div>
  );

  const imgCol = (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative min-h-[280px] md:min-h-0 overflow-hidden"
    >
      {imgUrl ? (
        <img src={imgUrl} alt={title} className="w-full h-full object-cover" style={{ minHeight: "100%" }} />
      ) : (
        <div className="w-full h-full min-h-[280px] flex items-center justify-center" style={{ background: `${accent}10` }}>
          <span className="font-primary text-[8rem] leading-none select-none" style={{ color: `${accent}22` }}>
            DG
          </span>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="border-t border-border" style={bgStyle}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {imageLeft ? (
            <>
              <div className="order-1">{imgCol}</div>
              <div className="order-2">{textCol}</div>
            </>
          ) : (
            <>
              <div className="order-2 md:order-1">{textCol}</div>
              <div className="order-1 md:order-2">{imgCol}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

const LatestFromDancerGirl = () => {
  const [articles, setArticles] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const excludeSections = ["choreographers-corner", "dancer-speak-up", "money-moves"];
        const featuredData = await getArticles({ limit: 3, featured: true, excludeSections });
        const recentData = await getArticles({ limit: 9, excludeSections });

        const featuredIds = new Set(featuredData.map((a: any) => a._id));
        const combined = [
          ...featuredData,
          ...recentData.filter((a: any) => !featuredIds.has(a._id)),
        ].slice(0, 9);

        setArticles(combined);
      } catch (err) {
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const articleTemplate = (article: any) => {
    const title = str(article.title);
    const excerpt = str(article.excerpt);
    const categoryTitle = article.categories?.[0]?.title
      ? str(article.categories[0].title)
      : null;

    return (
      <div className="px-3 h-full">
        <Link to={`/article/${article.slug?.current || article._id}`} className="block h-full">
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
              {categoryTitle && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {categoryTitle}
                </span>
              )}
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
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" message="Loading latest stories..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── Main carousel ── */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-secondary font-bold text-foreground mb-3">
              Latest from DANCERGIRL
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest stories from the Caribbean dance world
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-foreground mb-2">Stories Coming Soon</h3>
              <p className="text-muted-foreground">We're preparing amazing content for you.</p>
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
              to="/stories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              View All Stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Money Moves spotlight ── */}
      <CategorySpotlight
        categorySlug="money-moves"
        categoryLabel="Money Moves"
        viewAllPath="/money-moves"
        imageLeft={false}
        accent="#FB9E32"
        bgStyle={{ background: "hsl(32 96% 59% / 0.09)" }}
      />

      {/* ── Choreographer's Corner spotlight ── */}
      <CategorySpotlight
        categorySlug="choreographers-corner"
        categoryLabel="Choreographer's Corner"
        viewAllPath="/choreographers-corner"
        imageLeft={true}
        accent="#81414B"
        bgStyle={{ background: "hsl(351 33% 38% / 0.09)" }}
      />
    </>
  );
};

export default LatestFromDancerGirl;
