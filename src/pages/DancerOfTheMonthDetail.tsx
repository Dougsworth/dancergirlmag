import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { getDancerOfTheMonthBySlug, type SanityDancerOfTheMonth } from "@/lib/sanity";
import { PageLayout } from '@/components/PageLayout';
import { ArrowLeft, Calendar, Eye, ExternalLink } from "lucide-react";
import { PortableText } from '@portabletext/react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OptimizedImage, HDImage } from "@/components/OptimizedImage";

export default function DancerOfTheMonthDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [dancer, setDancer] = useState<SanityDancerOfTheMonth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDancer = async () => {
      if (!slug) {
        setError("No dancer specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const dancerData = await getDancerOfTheMonthBySlug(slug);
        
        if (!dancerData) {
          setError("Dancer not found");
          navigate('/dancers-of-the-month', { replace: true });
          return;
        }
        
        setDancer(dancerData);
        
        // Removed confetti animation
      } catch (err) {
        console.error("Error fetching dancer:", err);
        setError("Failed to load dancer details");
      } finally {
        setLoading(false);
      }
    };

    fetchDancer();
  }, [slug, navigate]);


  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return '📷';
      case 'youtube':
        return '📺';
      case 'tiktok':
        return '🎵';
      case 'twitter':
        return '🐦';
      case 'website':
        return '🌐';
      default:
        return '🔗';
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          to="/dancers-of-the-month" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors font-body"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to D.O.M Archive
        </Link>

        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-secondary font-bold mb-4">{error}</h2>
            <Link 
              to="/dancers-of-the-month" 
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to D.O.M Archive
            </Link>
          </div>
        ) : dancer ? (
          <article className="space-y-8">
            {/* Header */}
            <header className="text-center space-y-4">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Badge variant="secondary" className="font-body">
                  <Calendar className="h-3 w-3 mr-1" />
                  {dancer.month} {dancer.year}
                </Badge>
                <Badge variant="outline" className="font-body">Dancer of the Month</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-primary font-bold mb-4">
                {dancer.dancerName || 'Unknown Dancer'}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                {typeof dancer.excerpt === 'string' ? dancer.excerpt : (dancer.excerpt as any)?.en || ''}
              </p>

              <div className="flex items-center justify-center text-sm text-muted-foreground font-body">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(dancer.publishedAt), 'MMMM d, yyyy')}
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full rounded-lg overflow-hidden bg-gray-50">
              <OptimizedImage
                image={dancer.featuredImage}
                alt={dancer.dancerName || 'Dancer'}
                width={1200}
                quality={100}
                objectFit="contain"
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Categories */}
            {dancer.categories && dancer.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {dancer.categories.map((category) => (
                  <Badge key={category} variant="outline" className="font-body">
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            {/* Featured Story */}
            {dancer.featuredStory && (
              <div className="prose prose-lg max-w-none font-body">
                <h2 className="font-secondary mb-6">About {dancer.dancerName || 'the Dancer'}</h2>
                <PortableText value={dancer.featuredStory} />
              </div>
            )}

            {/* Social Links */}
            {dancer.socialLinks && dancer.socialLinks.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="font-secondary text-lg">Connect with {(dancer.dancerName || 'Artist').split(' ')[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dancer.socialLinks.map((link, index) => (
                      <Button key={index} variant="outline" size="sm" asChild className="font-body">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <span className="mr-1">{getSocialIcon(link.platform)}</span>
                          {link.platform}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            {dancer.achievements && dancer.achievements.length > 0 && (
              <Card className="border-primary/20 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="font-secondary text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    ✨ Notable Achievements ✨
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dancer.achievements.map((achievement, index) => (
                      <div key={index} className="relative bg-white/40 dark:bg-black/10 rounded-xl p-6 border border-primary/15 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/25">
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-black dark:bg-white rounded-full shadow-lg border-2 border-white dark:border-gray-800"></div>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-secondary font-bold text-lg mb-2 text-foreground">
                              {typeof achievement.achievement === 'string' ? achievement.achievement : achievement.achievement?.en || 'Achievement'}
                            </h4>
                            {achievement.description && (
                              <p className="text-muted-foreground font-body leading-relaxed">
                                {typeof achievement.description === 'string' ? achievement.description : achievement.description?.en || ''}
                              </p>
                            )}
                          </div>
                          {achievement.year && (
                            <Badge variant="secondary" className="text-sm font-body font-semibold bg-primary/20 text-primary border-primary/30">
                              {achievement.year}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video Highlights */}
            {dancer.videoHighlights && dancer.videoHighlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-secondary">Video Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {dancer.videoHighlights.map((video, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        {video.thumbnail && (
                          <div className="relative w-full h-40 rounded overflow-hidden mb-3">
                            <HDImage
                              image={video.thumbnail}
                              alt={video.title}
                              preset="card"
                              className="w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Eye className="w-6 h-6 text-gray-700" />
                              </div>
                            </div>
                          </div>
                        )}
                        <h4 className="font-secondary font-semibold mb-2">{video.title}</h4>
                        {video.description && (
                          <p className="text-sm text-muted-foreground mb-3 font-body">{video.description}</p>
                        )}
                        <Button variant="outline" size="sm" asChild className="font-body">
                          <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                            Watch Video
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery */}
            {dancer.gallery && dancer.gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-secondary">Performance Showcase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {dancer.gallery.map((image, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <div className="relative rounded-lg overflow-hidden aspect-square cursor-pointer group">
                            <HDImage
                              image={image}
                              alt={`Gallery image ${index + 1}`}
                              preset="gallery"
                              className="w-full h-full hover:scale-105 transition-transform duration-300 group-hover:brightness-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl w-full p-0">
                          <OptimizedImage
                            image={image}
                            alt={`Gallery image ${index + 1}`}
                            preset="full"
                            className="w-full h-full rounded-lg"
                            eager
                          />
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </article>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body">Dancer not found.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}