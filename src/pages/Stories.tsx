import { useState, useEffect } from "react";
import { getArticles, SanityArticle } from "@/lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout } from '@/components/PageLayout';
import StoryCard from '@/components/StoryCard';

// Use the Article type from Sanity directly
type Article = SanityArticle;

export default function Stories() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const articlesPerPage = 9;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        // Exclude sections that have their own dedicated pages
        const data = await getArticles({
          limit: 100,
          excludeSections: ["choreographers-corner", "dancer-speak-up", "money-moves"],
        });
        setArticles(data);
        setTotalPages(Math.ceil((data?.length || 0) / articlesPerPage));
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles
    .filter(article => {
      // Only filter by search term, category filtering is done server-side
      const title = typeof article.title === 'string' ? article.title : article.title?.en || '';
      const excerpt = typeof article.excerpt === 'string' ? article.excerpt : article.excerpt?.en || '';
      
      const matchesSearch = !searchTerm || 
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        
      return matchesSearch;
    });

  // Paginate the filtered articles
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  // Update total pages when search changes
  useEffect(() => {
    setTotalPages(Math.ceil(filteredArticles.length / articlesPerPage));
    setCurrentPage(1);
  }, [searchTerm, filteredArticles.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <Button
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </PageLayout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <PageLayout>
      <motion.div 
        className="page-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.section 
          className="py-16 md:py-24 relative overflow-hidden"
          variants={headerVariants}
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">
                Stories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Articles, insights, and stories from the world of Caribbean dance
              </p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-md mx-auto mb-8"
              variants={filterVariants}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Spacer after search */}
        <div className="mb-12" />

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i} 
                className="animate-pulse"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
                  <div className="h-48 bg-muted/50"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted/50 rounded w-3/4"></div>
                    <div className="h-4 bg-muted/50 rounded w-full"></div>
                    <div className="h-4 bg-muted/50 rounded w-2/3"></div>
                    <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredArticles.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="subsection-title mb-2">
                  {searchTerm ? 'No matching stories found' : 'No stories available yet'}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchTerm ? 'Try adjusting your search terms or category filter.' : 'Check back soon for new stories and articles!'}
                </p>
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                )}
              </motion.div>
            ) : (
              <>
                {/* Enhanced Articles Grid */}
                <motion.div
                  key="articles-grid"
                  className="container mx-auto px-4 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedArticles.map((article, index) => (
                      <StoryCard
                        key={article._id}
                        article={article}
                        index={index}
                        featured={index === 0 && currentPage === 1}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div 
                    className="flex justify-center items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rounded-full"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 rounded-full p-0"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="rounded-full"
                    >
                      Next
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </PageLayout>
  );
}