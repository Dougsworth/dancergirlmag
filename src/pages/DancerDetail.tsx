import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Instagram, Youtube, Twitter, Globe, Star, X } from "lucide-react";
import { urlFor, getDancerBySlug, SanityArtist } from "@/lib/sanity";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Dancer extends SanityArtist {
  gallery?: Array<{
    _key: string;
    _type: 'image';
    alt?: string;
    caption?: string;
    asset?: {
      _ref: string;
      _type: 'reference';
    };
  }>;
}

const DancerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [dancer, setDancer] = useState<Dancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchDancer = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const dancerData = await getDancerBySlug(slug);
        setDancer(dancerData);
      } catch (err) {
        console.error("Error fetching dancer:", err);
        setError("Failed to load dancer details");
      } finally {
        setLoading(false);
      }
    };

    fetchDancer();
  }, [slug]);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "youtube":
        return <Youtube className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "website":
        return <Globe className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-background via-transparent to-background"
        >
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="animate-pulse"
            >
              <div className="h-8 bg-muted/50 rounded w-32 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-96 bg-muted/50 rounded-xl"></div>
                <div className="space-y-6">
                  <div className="h-12 bg-muted/50 rounded w-3/4"></div>
                  <div className="h-6 bg-muted/50 rounded w-1/2"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted/50 rounded w-full"></div>
                    <div className="h-4 bg-muted/50 rounded w-5/6"></div>
                    <div className="h-4 bg-muted/50 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </PageLayout>
    );
  }

  if (error || !dancer) {
    return (
      <PageLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-background via-transparent to-background flex items-center justify-center"
        >
          <div className="text-center max-w-md mx-auto px-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6 flex justify-center"
            ><img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16" /></motion.div>
            <h2 className="text-2xl font-secondary font-bold text-red-600 mb-4">Dancer Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The dancer you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="rounded-full">
              <Link to="/dancers" className="inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dancers
              </Link>
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
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dancers" className="inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dancers
              </Link>
            </Button>
          </motion.nav>

          {/* Enhanced Dancer Profile with Parallax */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative"
            style={{ height: 'auto' }}
          >
            {/* Profile Image with Parallax */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative sticky top-8"
              style={{ height: 'fit-content' }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Try main image first, then gallery images, then fallback */}
                {dancer.image && urlFor(dancer.image) ? (
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={urlFor(dancer.image)?.width(600).height(700).url()}
                    alt={dancer.name}
                    className="w-full h-[400px] lg:h-[500px] object-cover shadow-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Try first gallery image if main image fails
                      if (dancer.gallery && dancer.gallery[0] && urlFor(dancer.gallery[0])) {
                        target.src = urlFor(dancer.gallery[0])?.width(600).height(700).url() || "/DG Monogram Letters ONLY Digital Black.png";
                      } else {
                        target.src = "/DG Monogram Letters ONLY Digital Black.png";
                        target.classList.add('object-contain', 'p-8');
                        target.classList.remove('object-cover');
                      }
                    }}
                  />
                ) : dancer.gallery && dancer.gallery[0] && urlFor(dancer.gallery[0]) ? (
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={urlFor(dancer.gallery[0])?.width(600).height(700).url()}
                    alt={dancer.name}
                    className="w-full h-[400px] lg:h-[500px] object-cover shadow-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/DG Monogram Letters ONLY Digital Black.png";
                      target.classList.add('object-contain', 'p-8');
                      target.classList.remove('object-cover');
                    }}
                  />
                ) : (
                  <div className="w-full h-[400px] lg:h-[500px] bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
                    <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-16 h-16 opacity-30" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Dancer Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 relative"
            >
              {/* Name & Badge */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-4 leading-tight"
                >
                  {dancer.name}
                </motion.h1>

                {dancer.isFeatured && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Badge variant="outline" className="text-primary border-primary/30 font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Featured Dancer
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Bio */}
              {dancer.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.p
                    className="text-foreground/80 text-[1.05rem] leading-[1.85]"
                    animate={{ height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      const bioText = Array.isArray(dancer.bio) && dancer.bio[0]?.children?.[0]?.text || dancer.bio;
                      if (!bioText) return '';

                      if (bioText.length <= 300) return bioText;

                      return isExpanded
                        ? bioText
                        : bioText.substring(0, 300) + "...";
                    })()}
                  </motion.p>

                  {(() => {
                    const bioText = Array.isArray(dancer.bio) && dancer.bio[0]?.children?.[0]?.text || dancer.bio;
                    return bioText && bioText.length > 300 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary hover:text-primary/80 text-sm font-medium mt-3 transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    );
                  })()}
                </motion.div>
              )}

              {/* Divider */}
              <div className="w-12 h-[2px] bg-primary/40" />

              {/* Specialty */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-2">Specialty</p>
                <p className="text-foreground text-lg font-secondary">Contemporary Caribbean Movement</p>
              </motion.div>

              {/* Social Links */}
              {dancer.socialLinks && dancer.socialLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">Connect</p>
                  <div className="flex flex-wrap gap-3">
                    {dancer.socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                        aria-label={`${dancer.name}'s ${social.platform}`}
                      >
                        {getSocialIcon(social.platform)}
                        <span className="capitalize">{social.platform}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Simplified Photo Gallery */}
          {dancer.gallery && dancer.gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-secondary font-bold text-foreground mb-2">Behind the Moves</h2>
                <p className="text-muted-foreground">Capturing the artistry in motion</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {dancer.gallery.slice(0, 6).map((image, index) => (
                  <motion.div
                    key={image._key || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative overflow-hidden rounded-xl cursor-pointer bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                  >
                    {image && urlFor(image) ? (
                      <img
                        src={urlFor(image)?.width(300).height(200).url()}
                        alt={image.alt || "Gallery image"}
                        className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-32 md:h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Photo {index + 1}</span>
                      </div>
                    )}
                    
                    {/* Simple overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-sm font-medium">View</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Enhanced Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-4xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedImage && urlFor(selectedImage) ? (
                    <img
                      src={urlFor(selectedImage)?.width(800).height(600).url()}
                      alt={selectedImage.alt || "Enlarged view"}
                      className="w-full max-h-[80vh] object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-96 bg-muted/20 flex items-center justify-center rounded-xl">
                      <span className="text-muted-foreground">No image available</span>
                    </div>
                  )}
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  {selectedImage.caption && (
                    <div className="absolute bottom-4 left-4 right-16 bg-black/80 backdrop-blur-sm text-white p-4 rounded-xl">
                      <p className="text-sm leading-relaxed">{selectedImage.caption}</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default DancerDetail; 