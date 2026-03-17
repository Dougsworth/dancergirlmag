import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { StandardLayout } from "@/components/StandardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, Heart, MessageSquare, Feather, Mail, ScrollText, Pen, Star } from "lucide-react";
import { getEditorLetterBySlug, getFounder, urlFor, getLocalizedContent, type SanityEditorLetter, type SanityFounder } from "@/lib/sanity";
import { SanityImage } from "@/components/SanityImage";
import { format } from "date-fns";
import { PortableText } from "@/lib/portableText";

// Helper function to safely format dates
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

const EditorLetterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [letter, setLetter] = useState<SanityEditorLetter | null>(null);
  const [founder, setFounder] = useState<SanityFounder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setError("No letter specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch both letter and founder data in parallel
        const [letterData, founderData] = await Promise.all([
          getEditorLetterBySlug(slug),
          getFounder()
        ]);
        
        if (!letterData) {
          setError("Letter not found");
          return;
        }
        
        setLetter(letterData);
        setFounder(founderData);
        
        console.log('Editor letter data:', letterData);
        console.log('Founder data:', founderData);
        console.log('Author data:', letterData.author);
        if (letterData.author) {
          console.log('Author image:', letterData.author.image);
          console.log('Author name:', letterData.author.name);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load letter");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <StandardLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </StandardLayout>
    );
  }

  if (error || !letter) {
    return (
      <StandardLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            {founder?.image ? (
              <div className="w-24 h-16 mb-4 mx-auto rounded-lg overflow-hidden shadow-md">
                <SanityImage
                  image={founder.image}
                  alt="Founder"
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                  fallbackClassName="w-full h-full object-contain p-2"
                />
              </div>
            ) : (
              <Heart className="w-16 h-16 mb-4 text-primary/30 mx-auto" />
            )}
            <h2 className="text-2xl font-bold mb-4 text-foreground">{error || 'Letter not found'}</h2>
            <Link to="/editor-letters">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Letters
              </Button>
            </Link>
          </div>
        </div>
      </StandardLayout>
    );
  }

  return (
    <StandardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="mb-8">
          <Link to="/editor-letters">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Letters
            </Button>
          </Link>
        </nav>

        {/* Letter Header */}
        <header className="mb-8">
          {/* Full-width founder image */}
          {founder?.image && (
            <div className="w-full h-[40vh] md:h-[50vh] rounded-xl overflow-hidden shadow-lg mb-8">
              <SanityImage
                image={founder.image}
                alt="Founder"
                width={900}
                height={500}
                className="w-full h-full object-cover object-top"
                fallbackClassName="w-full h-full object-contain p-4"
              />
            </div>
          )}

          {letter.featured && (
            <div className="mb-4">
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                Featured Letter
              </Badge>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            {getLocalizedContent(letter.title) || letter.title}
          </h1>

          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            <time dateTime={letter.publishedAt} className="mr-6">
              {formatFullDate(letter.publishedAt)}
            </time>
            {letter.author && (
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <SanityImage
                    image={letter.author.image}
                    alt={getLocalizedContent(letter.author.name) || letter.author.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                    fallbackClassName="w-full h-full object-contain bg-muted p-1"
                  />
                </div>
                <span>{getLocalizedContent(letter.author.name) || letter.author.name}</span>
                {letter.author.title && (
                  <span className="ml-2 text-muted-foreground/70">
                    • {getLocalizedContent(letter.author.title) || letter.author.title}
                  </span>
                )}
              </div>
            )}
          </div>

          {letter.excerpt && (
            <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border-l-4 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5">
                <ScrollText className="w-24 h-24" />
              </div>
              <p className="text-lg text-muted-foreground italic leading-relaxed relative z-10">
                "{getLocalizedContent(letter.excerpt) || letter.excerpt}"
              </p>
            </div>
          )}
        </header>

        {/* Letter Content */}
        <article className="prose prose-xl dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-muted/10 prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-li:text-foreground prose-ul:my-6 prose-ol:my-6">
          <PortableText
            value={getLocalizedContent(letter.content) || letter.content || []}
          />
        </article>

        {/* Letter Signature Section */}
        <div className="mt-12 text-right">
          <div className="inline-block">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-muted-foreground italic">With love and rhythm,</span>
              {founder?.image ? (
                <div className="w-8 h-6 rounded overflow-hidden animate-pulse shadow-sm">
                  <SanityImage
                    image={founder.image}
                    alt="Founder"
                    width={32}
                    height={24}
                    className="w-full h-full object-cover"
                    fallbackClassName="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <Heart className="w-5 h-5 text-primary animate-pulse" />
              )}
            </div>
            {letter.author && (
              <div className="flex items-center justify-end gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <SanityImage
                    image={letter.author.image}
                    alt={getLocalizedContent(letter.author.name) || letter.author.name}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                    fallbackClassName="w-full h-full object-contain bg-muted p-2"
                  />
                </div>
                <p className="text-xl font-secondary text-foreground">
                  {getLocalizedContent(letter.author.name) || letter.author.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Letter Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Published {formatFullDate(letter.publishedAt)}</span>
              {letter.author && (
                <span>• by {getLocalizedContent(letter.author.name) || letter.author.name}</span>
              )}
            </div>
            <Link to="/editor-letters">
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                All Letters
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </StandardLayout>
  );
};

export default EditorLetterDetail;
