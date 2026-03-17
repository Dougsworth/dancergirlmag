import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getDancers, SanityArtist, urlFor } from "@/lib/sanity";
import { PageLayout } from "@/components/PageLayout";
import { Search, User, MapPin, Calendar, ArrowRight, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dancers = () => {
  const [dancers, setDancers] = useState<SanityArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const dancersPerPage = 6;

  useEffect(() => {
    const fetchDancers = async () => {
      try {
        setLoading(true);
        const dancersData = await getDancers(20); // Get more dancers for the full listing
        setDancers(dancersData);
      } catch (err) {
        console.error("Error fetching dancers:", err);
        setError("Failed to load dancers");
      } finally {
        setLoading(false);
      }
    };

    fetchDancers();
  }, []);

  // Filter and sort dancers alphabetically based on search term
  const filteredDancers = dancers
    .filter((dancer) =>
      dancer.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  
  // Paginate the filtered dancers
  const startIndex = (currentPage - 1) * dancersPerPage;
  const endIndex = startIndex + dancersPerPage;
  const paginatedDancers = filteredDancers.slice(startIndex, endIndex);
  
  // Update total pages when search changes
  useEffect(() => {
    setTotalPages(Math.ceil(filteredDancers.length / dancersPerPage));
    setCurrentPage(1);
  }, [searchTerm, filteredDancers.length]);

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
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-16 md:py-24 bg-gradient-to-b from-background via-transparent to-background relative overflow-hidden"
          >
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">
                  Our Dancers
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Loading our talented Caribbean dancers...
                </p>
              </motion.div>
            </div>
          </motion.section>
          
          <div className="container mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="animate-pulse"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
                    <div className="h-56 bg-muted/50"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-muted/50 rounded w-3/4"></div>
                      <div className="h-4 bg-muted/50 rounded w-full"></div>
                      <div className="h-4 bg-muted/50 rounded w-2/3"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Our Dancers
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the talented Caribbean dancers featured on DancerGirl
              </p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search dancers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>
        

        {/* Dancers Grid */}
        <div className="container mx-auto px-4 pb-20">
          <AnimatePresence mode="wait">
            {filteredDancers.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchTerm ? "No dancers found" : "No dancers available yet"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchTerm 
                    ? "Try adjusting your search terms" 
                    : "Check back soon for profiles of amazing Caribbean dancers!"
                  }
                </p>
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    className="mt-4 rounded-full"
                  >
                    Clear search
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="dancers-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {paginatedDancers.map((dancer, index) => (
                  <motion.div
                    key={dancer._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/dancers/${dancer.slug?.current || `dancer-${index + 1}`}`}
                      className="group block h-full"
                    >
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        {/* Image Section */}
                        <div className="relative overflow-hidden">
                          <div className="relative w-full h-56 bg-gradient-to-br from-muted to-muted/50">
                            {dancer.image && dancer.image.asset && urlFor(dancer.image) ? (
                              <img
                                src={urlFor(dancer.image)?.width(400).height(300).url()}
                                alt={dancer.name || "Dancer"}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/DG Monogram Letters ONLY Digital Black.png";
                                  target.classList.add('object-contain', 'p-4');
                                  target.classList.remove('object-cover');
                                }}
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{ 
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="text-center"
                                >
                                  <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-12 h-12 mb-2 mx-auto" />
                                  <span className="text-muted-foreground text-sm">Dancer Profile</span>
                                </motion.div>
                              </div>
                            )}
                            
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Featured badge */}
                            {dancer.isFeatured && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                  Featured
                                </span>
                              </div>
                            )}
                            
                            {/* View profile indicator */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-primary-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6">
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {dancer.name || "Untitled"}
                            </h3>
                            
                            {dancer.bio && (
                              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                {Array.isArray(dancer.bio) && dancer.bio[0]?.children?.[0]?.text || 
                                 (typeof dancer.bio === 'string' ? dancer.bio : 'Professional Caribbean dancer')
                                }
                              </p>
                            )}
                            
                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/30">
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1 text-primary" />
                                <span>Dancer Profile</span>
                              </div>
                              <div className="flex items-center">
                                <Music className="w-3 h-3 mr-1 text-primary" />
                                <span>Caribbean Dance</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          {filteredDancers.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12 text-muted-foreground"
            >
              Showing {paginatedDancers.length} of {filteredDancers.length} dancers
            </motion.div>
          )}
          

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center items-center space-x-2 mt-8"
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
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Dancers;