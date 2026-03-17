import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getFeaturedStories, urlFor, SanityFeaturedStory } from '@/lib/sanity';
import { format } from 'date-fns';
import { OptimizedImage } from './OptimizedImage';
import { Button } from './ui/button';

const MagazineHero = () => {
  const [stories, setStories] = useState<SanityFeaturedStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      try {
        const data = await getFeaturedStories(3);
        setStories(data);
      } catch (error) {
        console.error('Error fetching featured stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStories();
  }, []);

  if (loading || stories.length === 0) {
    return (
      <div className="h-[600px] lg:h-[700px] bg-muted animate-pulse" />
    );
  }

  const mainStory = stories[0];
  const sideStories = stories.slice(1, 3);

  return (
    <section className="relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Feature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 relative group"
          >
            <Link to={`/stories/${mainStory.slug?.current}`}>
              <div className="relative overflow-hidden rounded-sm aspect-[16/10]">
                <OptimizedImage
                  image={mainStory.mainImage}
                  alt={mainStory.title}
                  preset="featured"
                  className="w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-white text-black px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      Featured
                    </span>
                    <div className="flex items-center text-white/80 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(mainStory.publishedAt), 'MMM d, yyyy')}
                    </div>
                    {mainStory.readTime && (
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {mainStory.readTime} min read
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-3xl lg:text-5xl font-secondary font-bold text-white mb-4 leading-tight">
                    {mainStory.title}
                  </h1>
                  
                  <p className="text-lg text-white/90 mb-6 line-clamp-2 max-w-3xl">
                    {mainStory.excerpt}
                  </p>
                  
                  <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                    <span className="font-medium mr-2">Read Story</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Stories */}
          <div className="lg:col-span-4 space-y-6">
            {sideStories.map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <Link to={`/stories/${story.slug?.current}`}>
                  <div className="flex gap-4">
                    <div className="w-1/3 aspect-square">
                      <OptimizedImage
                        image={story.mainImage}
                        alt={story.title}
                        preset="card"
                        className="w-full h-full rounded-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-2">
                        {format(new Date(story.publishedAt), 'MMM d, yyyy')}
                      </div>
                      <h3 className="font-secondary text-lg font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* View All Button */}
            <div className="pt-4">
              <Link to="/stories">
                <Button variant="outline" className="w-full">
                  View All Stories
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagazineHero;