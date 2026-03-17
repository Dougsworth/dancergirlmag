import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { getEditorLetters, getFeaturedEditorLetter, urlFor, getLocalizedContent, type SanityEditorLetter } from "@/lib/sanity";
import { PageLayout } from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowRight, MessageSquare, Heart, Feather, Mail, ScrollText } from "lucide-react";

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

export default function EditorLetters() {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">{error}</h2>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div 
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16 relative"
          variants={headerVariants}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">From the Editor</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold mb-6 text-foreground leading-tight">
              Letters from the Editor
            </h1>
          </motion.div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Personal messages and insights from the editor to the Caribbean dance community
          </p>
        </motion.div>


        {/* Featured Letter - Show only one */}
        {editorLetters.length > 0 ? (
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {editorLetters.filter(letter => letter.slug).slice(0, 1).map((letter, index) => (
              <motion.div
                key={letter._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="max-w-md w-full"
              >
                <Link to={`/editor-letters/${letter.slug?.current}`} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/40 hover:border-primary/20 bg-card overflow-hidden relative group">
                    {/* Subtle background decoration */}
                    <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                    </div>
                    
                    <CardHeader className="pb-4 pt-6 relative">
                      
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary">
                          {formatDate(letter.publishedAt)}
                        </Badge>
                        {letter.featured && (
                          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs shadow-sm">
                            <Feather className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-secondary font-bold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {getLocalizedContent(letter.title) || letter.title}
                      </h3>
                      
                      {(getLocalizedContent(letter.excerpt) || letter.excerpt) && (
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {getLocalizedContent(letter.excerpt) || letter.excerpt}
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="pt-2 pb-6 relative z-10">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground gap-1">
                          <Feather className="w-3 h-3 text-primary" />
                          <span className="italic text-xs">the editor</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <span className="text-xs uppercase tracking-wider">READ</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
          >
            <Feather className="w-16 h-16 mb-4 text-primary/30 mx-auto" />
            <h3 className="text-2xl font-secondary mb-2 text-foreground">
              No letters available yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Check back soon for personal messages from our editor!
            </p>
          </motion.div>
        )}

        {/* Coming Soon Section for Past Letters */}
        {editorLetters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-16 border-t border-border/30"
          >
            <div className="max-w-md mx-auto">
              <ScrollText className="w-12 h-12 mb-4 text-primary/50 mx-auto" />
              <h3 className="text-xl font-secondary font-bold mb-3 text-foreground">
                Past Letters Coming Soon
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We're working on organizing our archive of past editor letters. 
                Check back soon to explore previous insights and messages.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </PageLayout>
  );
}
