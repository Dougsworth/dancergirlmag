import { useState, useEffect } from "react";
import { getDancers, SanityArtist } from "@/lib/sanity";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import { ArrowRight, Star, Award } from "lucide-react";
import { DGIcon } from "./DGIcon";
import { SanityImage } from "./SanityImage";

const GallerySection = () => {
  const { t } = useTranslation();
  const [dancers, setDancers] = useState<SanityArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDancers = async () => {
      try {
        setLoading(true);
        const dancersData = await getDancers(6);
        setDancers(dancersData);
      } catch (err) {
        setError("Failed to load dancers");
        console.error("Error fetching dancers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDancers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="animate-pulse">
              <div className="h-6 bg-muted/50 rounded w-48 mb-2"></div>
              <div className="h-8 bg-muted/50 rounded w-64 mb-4"></div>
              <div className="h-4 bg-muted/50 rounded w-96"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-muted/50 rounded mb-4"></div>
                <div className="h-4 bg-muted/50 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted/50 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-destructive/10 border border-destructive/20 p-6 rounded">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Featured Artists
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            D.O.M Archive
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Celebrating the exceptional talent and artistry of Caribbean dancers who inspire through movement
          </p>
        </motion.div>

        {dancers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <DGIcon size="lg" className="mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                No dancers featured yet
              </h3>
              <p className="text-muted-foreground">
                Add some dancers in your Sanity Studio to see them featured here!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Featured Dancer - Main Spotlight */}
            {dancers[0] && (
              <motion.div
                variants={cardVariants}
                className="mb-12 pb-12 border-b border-border"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Featured Dancer Image */}
                  <div className="relative group">
                    <Link to={`/dancers/${dancers[0].slug?.current || 'featured-dancer'}`}>
                      <div className="relative h-96 lg:h-[500px] overflow-hidden rounded">
                        {dancers[0].image && dancers[0].image.asset && urlFor(dancers[0].image) ? (
                          <img
                            src={urlFor(dancers[0].image)?.width(600).height(700).quality(90).url()}
                            alt={dancers[0].name || "Featured dancer"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/DG Monogram Letters ONLY Digital Black.png";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <div className="text-center">
                              <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16 mb-4 mx-auto" />
                              <span className="text-muted-foreground text-lg">
                                {dancers[0].name || "Featured Dancer"}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Featured Dancer Content */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">
                        Spotlight
                      </span>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                        {dancers[0].name || "Featured Dancer"}
                      </h3>
                      
                      {dancers[0].bio && (
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                          {typeof dancers[0].bio === 'string' ? dancers[0].bio : 'Professional Caribbean dancer with extensive experience in traditional and contemporary styles.'}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {dancers[0].specialties?.map((specialty: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">
                          {specialty}
                        </span>
                      )) || (
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">
                          Caribbean Dance
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/dancers/${dancers[0].slug?.current || 'featured-dancer'}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      View Full Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Featured Dancers Grid */}
            {dancers.length > 1 && (
              <div>
                <h4 className="text-xl font-bold text-foreground mb-6">More Featured Artists</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dancers.slice(1, 6).map((dancer: SanityArtist, index: number) => (
                    <motion.article
                      key={dancer._id || index}
                      variants={cardVariants}
                      className="group"
                    >
                      <Link to={`/dancers/${dancer.slug?.current || `dancer-${index + 2}`}`}>
                        <div className="relative h-64 overflow-hidden rounded mb-4">
                          {dancer.image && dancer.image.asset && urlFor(dancer.image) ? (
                            <img
                              src={urlFor(dancer.image)?.width(400).height(300).quality(90).url()}
                              alt={dancer.name || "Dancer"}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/DG Monogram Letters ONLY Digital Black.png";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-12 h-12" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {dancer.name || "Untitled"}
                          </h5>
                          
                          {dancer.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {typeof dancer.bio === 'string' ? dancer.bio : 'Professional dancer specializing in Caribbean movement.'}
                            </p>
                          )}

                          <div className="flex items-center text-sm text-primary">
                            <span>View Profile</span>
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-12 border-t border-border"
        >
          <Link
            to="/dancers"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background font-medium rounded hover:bg-foreground/90 transition-colors"
          >
            View All Dancers
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
