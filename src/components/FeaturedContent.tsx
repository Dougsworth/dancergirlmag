import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getArticles, urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";

const FeaturedContent = () => {
  const [articles, setArticles] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        // Get all articles and filter for tutorial-focused ones
        const articlesData = await getArticles({ limit: 12 });
        
        // Filter for tutorial-focused articles
        const tutorialArticles = articlesData.filter(
          (article: any) =>
            (article.categories?.some((cat: any) => 
              cat?.title?.toLowerCase().includes("tutorial") ||
              cat?.slug?.current?.toLowerCase().includes("tutorial")
            )) ||
            article.title?.toLowerCase().includes("tutorial") ||
            article.title?.toLowerCase().includes("mastering") ||
            article.title?.toLowerCase().includes("guide") ||
            article.excerpt?.toLowerCase().includes("tutorial") ||
            article.excerpt?.toLowerCase().includes("learn") ||
            article.excerpt?.toLowerCase().includes("how to")
        );

        setArticles(
          tutorialArticles.length > 0
            ? tutorialArticles.slice(0, 3)
            : articlesData.slice(0, 3)
        );
      } catch (err) {
        console.error("Error fetching featured articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-6 leading-tight">
              <span className="block italic font-light tracking-widest">
                Latest from DancerGirl
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Loading the latest stories and insights...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="animate-pulse"
              >
                <div className="bg-muted h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Dance Tutorials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Step-by-step guides and tutorials to master Caribbean dance moves
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600 mb-6">
                Add some articles in your Sanity Studio to see them featured
                here!
              </p>
              <Link
                to="/stories"
                className="inline-flex items-center px-6 py-3 border border-input bg-background hover:bg-primary/10 hover:text-primary text-base font-medium rounded-md transition-colors"
              >
                Browse All Stories
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article: any, index: number) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/article/${article.slug?.current || article._id}`}>
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    {article.mainImage ? (
                      <img
                        src={urlFor(article.mainImage).width(800).height(450).url()}
                        alt={article.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/DG Monogram Letters ONLY Digital Black.png";
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        {article.publishedAt
                          ? format(new Date(article.publishedAt), "MMM d, yyyy")
                          : "No date"}
                      </span>
                      {article.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-pink-600 font-medium">
                            {article.category}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {article.author && (
                      <div className="flex items-center pt-3">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                          <span className="text-pink-600 text-sm font-medium">
                            {article.author
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {article.author}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/stories"
                              className="inline-flex items-center px-8 py-4 border border-input bg-background hover:bg-primary/10 hover:text-primary text-lg font-semibold rounded-md transition-colors"
            >
              View All Stories
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedContent;
