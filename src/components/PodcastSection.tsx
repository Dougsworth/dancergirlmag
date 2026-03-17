import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Headphones, ExternalLink, Radio, Mic2, Music } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPrimaryPodcastAd, urlFor, type SanityPodcastAd } from "@/lib/sanity";

const PodcastSection = () => {
  const { t } = useTranslation();
  const [podcastAd, setPodcastAd] = useState<SanityPodcastAd | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcastAd = async () => {
      try {
        const ad = await getPrimaryPodcastAd('home');
        setPodcastAd(ad);
      } catch (error) {
        console.error('Error fetching podcast ad:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastAd();
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/50 via-muted/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Headphones className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-secondary font-bold text-foreground mb-4">
            Listen to Our Stories
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          {/* Podcast Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50 relative overflow-hidden group"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Radio className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  OUR PODCAST
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-secondary font-bold text-foreground mb-4 leading-tight">
                Dancer: Speak Up!
              </h3>
              <p className="text-base text-muted-foreground mb-6">
                {podcastAd?.description || t('podcast.description', 'Join us as we explore Caribbean culture, dance, and the stories that make our community vibrant')}
              </p>
              
              {/* Featured Episode */}
              {podcastAd?.featuredEpisode && (
                <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-primary">
                      Episode {podcastAd.featuredEpisode.number}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {podcastAd.featuredEpisode.title}
                  </h4>
                  {podcastAd.featuredEpisode.description && (
                    <p className="text-xs text-muted-foreground">
                      {podcastAd.featuredEpisode.description}
                    </p>
                  )}
                </div>
              )}
              
              {/* Platform Links */}
              {podcastAd?.platforms && podcastAd.platforms.length > 0 ? (
                <div className="space-y-2">
                  {podcastAd.platforms.map((platform, index) => (
                    <motion.a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group mr-2 mb-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {platform.displayName || `Listen on ${platform.name}`}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <motion.a 
                    href="https://open.spotify.com/show/your-podcast-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group mr-2 mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Listen on Spotify
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a 
                    href="https://podcasts.apple.com/podcast/your-podcast-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group mr-2 mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Listen on Apple Music
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 lg:h-auto"
          >
            {podcastAd?.coverImage ? (
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={urlFor(podcastAd.coverImage)?.width(600).height(600).url()}
                  alt={podcastAd.coverImage.alt || podcastAd.title || 'Podcast Cover'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Play button overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="bg-white/90 rounded-full p-6 shadow-xl">
                    <Headphones className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Animated sound waves */}
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-32 h-32 rounded-full border-2 border-primary/20"
                      animate={{
                        scale: [1, 1.5 + i * 0.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Center icons */}
                <motion.div
                  className="relative z-10 bg-primary/10 backdrop-blur-sm rounded-full p-8"
                  style={{
                    backgroundColor: podcastAd?.backgroundColor || undefined
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Mic2 className="w-16 h-16 text-primary" />
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection; 