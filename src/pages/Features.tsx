import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Star, Award, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeaturedArticles, SanityArticle } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import PageLayout from "@/components/PageLayout";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  bgImage: string;
  color: string;
}

const features: FeatureCardProps[] = [
  {
    title: "International Artist Spotlights",
    description: "Stories of renowned Caribbean dancers making waves globally",
    icon: <Star className="h-8 w-8" />,
    link: "/stories",
    bgImage: "/images/IMG_0404.jpg",
    color: "text-blue-500"
  },
  {
    title: "Global Dance Profiles",
    description: "Featuring established artists on the international scene",
    icon: <Users className="h-8 w-8" />,
    link: "/stories",
    bgImage: "/images/IMG_0428.jpg",
    color: "text-purple-500"
  },
  {
    title: "Worldwide Events",
    description: "International Caribbean dance events and festivals",
    icon: <Calendar className="h-8 w-8" />,
    link: "/events",
    bgImage: "/images/IMG_0851.jpg",
    color: "text-pink-500"
  },
  {
    title: "Cultural Impact Stories",
    description: "How Caribbean artists influence dance globally",
    icon: <Award className="h-8 w-8" />,
    link: "/about",
    bgImage: "/images/IMG_0900.jpg",
    color: "text-green-500"
  },
  {
    title: "Dancer of the Month",
    description: "Monthly spotlight on outstanding Caribbean dancers",
    icon: <Star className="h-8 w-8" />,
    link: "/dancers-of-the-month",
    bgImage: "/images/IMG_0951.jpg",
    color: "text-yellow-500"
  },
  {
    title: "Worldwide Community",
    description: "Connect with dancers across the globe",
    icon: <Users className="h-8 w-8" />,
    link: "/about",
    bgImage: "/images/IMG_1088.jpg",
    color: "text-orange-500"
  },
];

export default function Features() {
  const [featuredStories, setFeaturedStories] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      try {
        setLoading(true);
        const stories = await getFeaturedArticles(3);
        setFeaturedStories(stories);
      } catch (err) {
        console.error('Error fetching featured stories:', err);
        setError('Failed to load featured stories');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStories();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative bg-background overflow-hidden">
        <div className="relative z-10 container mx-auto px-2 sm:px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground">
              Features
            </h1>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of stories, events, and insights from the Caribbean dance world.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 justify-items-center">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="card card-hover group w-full max-w-md"
              >
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${feature.bgImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className={`w-12 h-12 rounded-full ${feature.color}/10 flex items-center justify-center mb-4`}>
                      <span className={feature.color}>
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Stories Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-secondary text-foreground">Featured Articles</h2>
            <Link
              to="/stories"
              className="text-primary hover:text-primary/80 flex items-center text-sm font-medium transition-colors"
            >
              Browse Stories
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="h-48 bg-muted/20 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-muted/20 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-muted/20 rounded w-4/5 mb-3"></div>
                    <div className="h-4 bg-muted/20 rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted/20 rounded w-5/6 mb-6"></div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-muted/20 mr-3"></div>
                        <div className="h-4 bg-muted/20 rounded w-20"></div>
                      </div>
                      <div className="h-4 bg-muted/20 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredStories.map((story) => (
                <div key={story._id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    {story.mainImage ? (
                      <img
                        src={urlFor(story.mainImage).width(600).url()}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {story.section && (
                      <div className="flex items-center text-sm text-primary mb-3">
                        <span>{story.section.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    {story.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {story.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-primary text-xs font-medium">
                            {getInitials(story.author || 'DG')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-foreground">{story.author || 'DancerGirl'}</p>
                        </div>
                      </div>
                      <Link
                        to={`/stories/${story.slug.current}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors"
                      >
                        Read
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
