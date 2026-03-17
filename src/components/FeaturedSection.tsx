import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { getFeaturedArticles } from "@/lib/sanity";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";

const categoryColors = {
  Culture: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Events: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Tutorial: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  Health: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Interviews: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  History: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  guides: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "choreographer's corner": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  newsletter: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
};

export default function FeaturedSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articlesData = await getFeaturedArticles();
        setArticles(articlesData);
      } catch (err) {
        console.error("Error fetching featured articles:", err);
        setError("Failed to load featured content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted/50 rounded w-1/4 mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted/50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null; // Don't render anything if no featured articles
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Featured Stories"
          subtitle="Discover our handpicked selection of the best dance stories and insights"
        />

        {/* Articles Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {articles.map((article) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/article/${article.slug?.current}`}>
                <div className="relative h-56 w-full overflow-hidden">
                  {article.mainImage && (
                    <img
                      src={urlFor(article.mainImage).width(600).height(400).url()}
                      alt={article.imageAlt || article.title || 'Featured story image'}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      categoryColors[article.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="card-title font-heading text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="body-text text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-small text-muted-foreground">
                    <span className="font-proxima font-medium">{article.readTime || '5'} min read</span>
                    <span className="font-proxima">{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Centered */}
        <div className="mt-12 text-center">
          <Button asChild className="shadow-lg hover:shadow-xl">
            <Link
              to="/stories"
              className="inline-flex items-center"
            >
              View all
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
