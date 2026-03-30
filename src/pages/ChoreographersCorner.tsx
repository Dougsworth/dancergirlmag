import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getArticles, SanityArticle } from "@/lib/sanity";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import StoryCard from "@/components/StoryCard";

const ChoreographersCorner = () => {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getArticles({ limit: 100, section: "choreographers-corner" })
      .then(setArticles)
      .catch((err) => {
        console.error("Error fetching choreographer articles:", err);
        setError("Failed to load articles. Please check your internet connection.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout>
      <motion.div
        className="page-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-background via-transparent to-background relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">
                Choreographer's Corner
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stories, techniques, and insights from the creative minds behind Caribbean dance
              </p>
            </div>
          </div>
        </motion.section>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 mb-12">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-muted/50 rounded-t-xl" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted/50 rounded w-3/4" />
                    <div className="h-4 bg-muted/50 rounded w-full" />
                    <div className="h-4 bg-muted/50 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <img
                src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"}
                alt="DancerGirl"
                className="w-16 h-16 mb-4 mx-auto"
              />
              <h2 className="text-2xl font-bold mb-4 text-foreground">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Check back soon for stories from the Caribbean dance choreography community.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {articles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <StoryCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default ChoreographersCorner;
