import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { SanityChoreographer, getChoreographers, urlFor } from "@/lib/sanity";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, Quote, ExternalLink, Sparkles, Users, Heart, Award } from "lucide-react";

// Fixed categories for tabs
const choreographerCategories = [
  { id: "featured", name: "Featured", icon: Sparkles },
  { id: "contemporary", name: "Contemporary", icon: Users },
  { id: "traditional", name: "Traditional", icon: Heart },
  { id: "emerging", name: "Emerging", icon: Award },
];

const ChoreographersCorner = () => {
  const { theme } = useTheme();
  const [choreographers, setChoreographers] = useState<SanityChoreographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("featured");

  useEffect(() => {
    const fetchChoreographers = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch choreographers from Sanity
        const sanityChoreographers = await getChoreographers({});
        setChoreographers(sanityChoreographers || []);
      } catch (err) {
        console.error("Error fetching choreographers:", err);
        setError("Failed to load choreographers. Please check your internet connection.");
        // Still set empty array to allow page to render
        setChoreographers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChoreographers();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted/50 rounded w-48 mb-4"></div>
              <div className="h-4 bg-muted/50 rounded w-64"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Choreographers</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
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

  return (
    <PageLayout>
      <motion.div 
        className="page-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header - Consistent with other pages */}
        <motion.section 
          className="py-16 md:py-24 bg-gradient-to-b from-background via-transparent to-background relative overflow-hidden"
          variants={headerVariants}
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="text-center mb-12">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground">
                  Choreographer's Corner
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover stories, techniques, and insights from the creative minds behind Caribbean dance
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Tab Navigation */}
        <motion.div 
          className="container mx-auto px-4 mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full max-w-4xl">
              {choreographerCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      console.log(`Clicking category: ${category.id}`);
                      setSelectedCategory(category.id);
                    }}
                    className={cn(
                      "rounded-full px-3 md:px-6 py-2 transition-all duration-300 hover:scale-105 text-xs md:text-sm flex items-center justify-center cursor-pointer relative z-20 font-medium",
                      selectedCategory === category.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background border border-input hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                    <span className="truncate">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
        
        {/* Choreographers Grid */}
        <div className="container mx-auto px-4 mb-12">
          {choreographers.length === 0 ? (
            <div className="text-center py-16">
              <img 
                src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"} 
                alt="DancerGirl" 
                className="w-16 h-16 mb-4 mx-auto" 
              />
              <h2 className="text-2xl font-bold mb-4 text-foreground">No Choreographers Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Check back soon for featured choreographers and their stories from the Caribbean dance community.
              </p>
            </div>
          ) : (
            <motion.div 
              className="grid gap-8 md:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Show content based on selected tab */}
              {selectedCategory === "featured" && (
                choreographers.some(c => c.featured)
                  ? choreographers.filter(c => c.featured)
                  : choreographers
              ).map((choreographer, index) => (
                <motion.div
                  key={choreographer._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="group block h-full">
                    <article className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 h-full hover:shadow-xl transition-all duration-300">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-800">
                          {choreographer.profileImage ? (
                            <img
                              src={urlFor(choreographer.profileImage)?.width(400).height(300).url() || (theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png")}
                              alt={choreographer.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png";
                                target.classList.add('object-contain', 'p-4');
                                target.classList.remove('object-cover');
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <img 
                                src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"} 
                                alt="DancerGirl" 
                                className="w-12 h-12" 
                              />
                            </div>
                          )}
                          
                          {/* Specialties badges */}
                          {choreographer.specialties && choreographer.specialties.length > 0 && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              {choreographer.specialties.slice(0, 2).map((specialty, idx) => (
                                <span key={idx} className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                  {specialty}
                                </span>
                              ))}
                              {choreographer.specialties.length > 2 && (
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                                  +{choreographer.specialties.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {choreographer.name}
                          </h3>
                          
                          {choreographer.bio && (
                            <p className="text-foreground/70 dark:text-foreground/65 line-clamp-3 leading-relaxed text-[0.95rem]">
                              {choreographer.bio}
                            </p>
                          )}

                          {/* Featured Work */}
                          {choreographer.featuredWork && choreographer.featuredWork.length > 0 && (
                            <div className="pt-2">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Featured Work:</h4>
                              <div className="space-y-1">
                                {choreographer.featuredWork.slice(0, 2).map((work, idx) => (
                                  <div key={idx} className="text-sm text-foreground/65">
                                    <span className="font-medium">{work.title}</span>
                                    {work.year && <span className="ml-2 text-xs">({work.year})</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Social Links */}
                          {choreographer.socialLinks && (
                            <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                              {choreographer.socialLinks.instagram && (
                                <a
                                  href={choreographer.socialLinks.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              {choreographer.socialLinks.website && (
                                <a
                                  href={choreographer.socialLinks.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              {choreographer.publishedAt && (
                                <span className="text-sm text-muted-foreground ml-auto">
                                  {format(new Date(choreographer.publishedAt), 'MMM d, yyyy')}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </motion.div>
              ))}
              
              {/* Non-featured tabs: filter by specialty */}
              {selectedCategory !== "featured" && choreographers
                .filter(choreographer =>
                  choreographer.specialties?.some(s =>
                    s.toLowerCase().includes(selectedCategory)
                  )
                )
                .map((choreographer, index) => (
                <motion.div
                  key={choreographer._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="group block h-full">
                    <article className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 h-full hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-800">
                          {choreographer.profileImage ? (
                            <img
                              src={urlFor(choreographer.profileImage)?.width(400).height(300).url() || (theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png")}
                              alt={choreographer.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png";
                                target.classList.add('object-contain', 'p-4');
                                target.classList.remove('object-cover');
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <img
                                src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"}
                                alt="DancerGirl"
                                className="w-12 h-12"
                              />
                            </div>
                          )}
                          {choreographer.specialties && choreographer.specialties.length > 0 && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              {choreographer.specialties.slice(0, 2).map((specialty, idx) => (
                                <span key={idx} className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {choreographer.name}
                          </h3>
                          {choreographer.bio && (
                            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                              {choreographer.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </motion.div>
              ))}

              {/* Empty state for tabs with no matches */}
              {selectedCategory !== "featured" && choreographers
                .filter(choreographer =>
                  choreographer.specialties?.some(s =>
                    s.toLowerCase().includes(selectedCategory)
                  )
                ).length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full text-center py-16"
                >
                  <img
                    src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"}
                    alt="DancerGirl"
                    className="w-16 h-16 mb-4 mx-auto"
                  />
                  <h3 className="text-2xl font-bold mb-4 text-foreground capitalize">{selectedCategory} Choreographers</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Check back soon for {selectedCategory} choreographer profiles.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Call to Action - Consistent with other pages */}
        {choreographers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="container mx-auto px-4 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Discover more stories and insights from Caribbean dance choreographers
            </p>
            
            <Button asChild className="rounded-full">
              <Link to="/stories?category=choreographers-corner" className="inline-flex items-center">
                View All Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </PageLayout>
  );
};

export default ChoreographersCorner; 