import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, ArrowRight, Music, Trophy, Play } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getDancersOfTheMonth, urlFor, type SanityDancerOfTheMonth } from "@/lib/sanity";

const DancersOfTheMonth = () => {
  const [dancers, setDancers] = useState<SanityDancerOfTheMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const dancersPerPage = 6;

  useEffect(() => {
    const fetchDancers = async () => {
      try {
        setLoading(true);
        const data = await getDancersOfTheMonth({ limit: 50 });
        setDancers(data);
        setTotalPages(Math.ceil((data?.length || 0) / dancersPerPage));
      } catch (err) {
        console.error('Error fetching dancers of the month:', err);
        setError('Failed to load dancers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDancers();
  }, []);
  
  // Paginate dancers
  const startIndex = (currentPage - 1) * dancersPerPage;
  const endIndex = startIndex + dancersPerPage;
  const paginatedDancers = dancers.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <PageLayout>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-background via-transparent to-background"
        >
          {/* Enhanced Loading Hero */}
          <div className="relative py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold mb-6 text-foreground">D.O.M Archive</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Loading our featured dancers...</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-background via-transparent to-background flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 flex justify-center"
            ><img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16" /></motion.div>
            <h2 className="text-2xl font-secondary font-bold text-red-600 mb-4">Unable to Load Dancers</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="rounded-full">
              Try Again
            </Button>
          </div>
        </motion.div>
      </PageLayout>
    );
  }

  const getImageUrl = (image: any): string => {
    try {
      if (!image || !image.asset) {
        return '/DG Monogram Letters ONLY Digital Black.png';
      }
      const url = urlFor(image).width(600).height(400).url();
      return url || '/DG Monogram Letters ONLY Digital Black.png';
    } catch (error) {
      console.error('Error generating image URL:', error);
      return '/DG Monogram Letters ONLY Digital Black.png';
    }
  };

  return (
    <PageLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-background via-transparent to-background"
      >
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24 bg-gradient-to-b from-background via-transparent to-background relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">
                D.O.M Archive
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Celebrating the talented dancers who inspire and shape Caribbean dance culture
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Dancers: Speak Up Banner */}
        <div className="container mx-auto px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/10 border border-primary/20 rounded-2xl px-6 py-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 text-primary ml-0.5" />
              </div>
              <p className="text-foreground font-medium">
                Watch our featured dancers in action →{" "}
                <span className="text-primary">Dancers: Speak Up!</span>
              </p>
            </div>
            <Link to="/dancers-speak-up">
              <Button variant="default" size="sm" className="rounded-full whitespace-nowrap">
                Watch Now
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Dancers Grid */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {paginatedDancers.map((dancer, index) => {
              const artistName = typeof dancer.artist.name === 'string' 
                ? dancer.artist.name 
                : (dancer.artist.name as any)?.en || 'Unknown Dancer';
              const excerpt = typeof dancer.excerpt === 'string' 
                ? dancer.excerpt 
                : (dancer.excerpt as any)?.en || 'No description available.';
              
              return (
                <motion.div
                  key={dancer._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link to={`/dancers-of-the-month/${dancer.slug.current}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer h-full overflow-hidden"
                    >
                      
                      {/* Image */}
                      <motion.div
                        className="relative z-10 mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <img
                            src={getImageUrl(dancer.featuredImage)}
                            alt={artistName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/DG Monogram Letters ONLY Digital Black.png";
                              target.classList.add('object-contain', 'p-2');
                              target.classList.remove('object-cover');
                            }}
                          />
                        </div>
                      </motion.div>
                      
                      <div className="relative z-10 text-center">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {artistName}
                        </h3>
                        <p className="text-sm text-foreground/65 dark:text-foreground/60 leading-relaxed mb-4">
                          {excerpt}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {dancer.month} {dancer.year}
                        </div>
                      </div>
                      
                      {/* Subtle hover indicator */}
                      <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <div className="w-8 h-8 bg-primary/40 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                      
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          
          {/* Pagination */}
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
          
          {/* Empty State */}
          {dancers.length === 0 && !loading && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16 mb-6 mx-auto" />
              <h3 className="text-2xl font-secondary font-bold text-foreground mb-4">
                Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing to showcase amazing dancers. Check back soon for inspiring stories!
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default DancersOfTheMonth;