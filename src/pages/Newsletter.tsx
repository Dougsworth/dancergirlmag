import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StandardLayout } from "@/components/StandardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Send, Heart, Calendar, User, ArrowRight, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { getEditorLetters, getFeaturedEditorLetter, urlFor, type SanityEditorLetter } from "@/lib/sanity";
import { format } from "date-fns";

// Helper function to safely format dates
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Recently';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    return 'Recently';
  }
};

const formatFullDate = (dateString: string | undefined) => {
  if (!dateString) return 'Recently';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    return 'Recently';
  }
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [editorLetters, setEditorLetters] = useState<SanityEditorLetter[]>([]);
  const [featuredLetter, setFeaturedLetter] = useState<SanityEditorLetter | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const lettersPerPage = 6;

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [lettersData, featuredData] = await Promise.all([
          getEditorLetters({ limit: lettersPerPage, offset: (currentPage - 1) * lettersPerPage }),
          getFeaturedEditorLetter()
        ]);
        
        setEditorLetters(lettersData || []);
        setFeaturedLetter(featuredData);
        
        // Calculate total pages (we'll need to get total count)
        const totalLetters = await getEditorLetters({ limit: 1000 }); // Get all for count
        setTotalPages(Math.ceil((totalLetters?.length || 0) / lettersPerPage));
      } catch (err) {
        console.error('Error fetching editor letters:', err);
        setError('Failed to load editor letters');
        setEditorLetters([]);
        setFeaturedLetter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [currentPage]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <StandardLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-muted/50 rounded w-64 mb-4 mx-auto"></div>
              <div className="h-4 bg-muted/50 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </StandardLayout>
    );
  }

  if (error) {
    return (
      <StandardLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Newsletter</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </StandardLayout>
    );
  }

  return (
    <StandardLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">
            Newsletter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay connected with the latest updates on Caribbean dance culture, exclusive stories, and personal messages from our editor.
          </p>
        </div>

        {/* Compact Newsletter Subscription */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Stay Updated</h3>
                    <p className="text-sm text-muted-foreground">Get the latest news and stories delivered to your inbox</p>
                  </div>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full md:w-64"
                    required
                  />
                  <Button type="submit" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Letter */}
        {featuredLetter && featuredLetter.publishedAt && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                Featured Letter
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Letters from the Editor
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Personal messages and insights from our founder, sharing thoughts on Caribbean dance culture, community updates, and behind-the-scenes stories.
              </p>
            </div>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={featuredLetter.publishedAt}>
                        {formatFullDate(featuredLetter.publishedAt)}
                      </time>
                      {featuredLetter.tags && featuredLetter.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {featuredLetter.tags[0]}
                          </Badge>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {featuredLetter.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredLetter.excerpt}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  {/* Render first paragraph of content */}
                  {featuredLetter.content && featuredLetter.content.length > 0 && featuredLetter.content[0]?.children?.[0]?.text && (
                    <div className="text-muted-foreground leading-relaxed">
                      {featuredLetter.content[0].children[0].text.substring(0, 300)}...
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    {featuredLetter.author?.image ? (
                      <img
                        src={urlFor(featuredLetter.author.image).width(40).height(40).url()}
                        alt={featuredLetter.author.name || 'Editor'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-foreground">
                        {featuredLetter.author?.name || 'Editor'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {featuredLetter.author?.title || 'Founder, DancerGirl'}
                      </div>
                    </div>
                  </div>
                  <Link to={`/newsletter/${featuredLetter.slug.current}`}>
                    <Button variant="outline" size="sm">
                      Read Full Letter
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

                {/* Editor Letters Grid */}
        <div className="max-w-6xl mx-auto">
          {editorLetters.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {editorLetters.map((letter) => (
                  <Card key={letter._id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={letter.publishedAt}>
                          {formatDate(letter.publishedAt)}
                        </time>
                        {letter.featured && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              <Heart className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {letter.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {letter.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          {letter.author?.image ? (
                            <img
                              src={urlFor(letter.author.image).width(32).height(32).url()}
                              alt={letter.author.name || 'Editor'}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          <div className="text-sm">
                            <div className="font-medium text-foreground">
                              {letter.author?.name || 'Editor'}
                            </div>
                          </div>
                        </div>
                        <Link to={`/newsletter/${letter.slug.current}`}>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
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
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* No Letters Message */
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                No editor letters yet
              </h3>
              <p className="text-muted-foreground">
                Check back soon for personal messages from our editor!
              </p>
            </div>
          )}
        </div>
      </div>
    </StandardLayout>
  );
};

export default Newsletter;