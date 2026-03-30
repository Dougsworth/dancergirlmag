import { useState, useEffect } from "react";
import { getArticles, SanityArticle } from "@/lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout } from "@/components/PageLayout";
import StoryCard from "@/components/StoryCard";

export default function MoneyMoves() {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    getArticles({ limit: 100, section: "money-moves" })
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles = articles.filter((article) => {
    const title = typeof article.title === "string" ? article.title : (article.title as any)?.en || "";
    const excerpt = typeof article.excerpt === "string" ? article.excerpt : (article.excerpt as any)?.en || "";
    return (
      !searchTerm ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <motion.div
        className="page-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-4">
                Money Moves
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Turn your passion into profit. Practical guides on making money as a dancer in the Caribbean.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-3 rounded-full border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Articles */}
        {loading ? (
          <div className="container mx-auto px-4 pb-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-card rounded-xl overflow-hidden border border-border/50">
                  <div className="h-48 bg-muted/50" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted/50 rounded w-3/4" />
                    <div className="h-4 bg-muted/50 rounded w-full" />
                    <div className="h-4 bg-muted/50 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredArticles.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 container mx-auto px-4"
              >
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {searchTerm ? "No matching articles" : "Articles coming soon"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "We're working on Money Moves content. Check back soon!"}
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm("")} variant="outline" className="mt-4">
                    Clear search
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="articles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-4 pb-16"
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

                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
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
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </PageLayout>
  );
}
