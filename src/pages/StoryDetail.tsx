import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { getArticle, getFeaturedStoryBySlug, urlFor, getLocalizedContent } from "@/lib/sanity";
import { PageLayout } from '@/components/PageLayout';
import { ArrowLeft } from "lucide-react";
import { PortableText } from '@portabletext/react';

interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  body?: any[];
  categories?: Array<{
    _id?: string;
    title: string;
    slug: {
      current: string;
    };
  }>;
  readTime?: number;
}

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to determine back navigation based on article category
  const getBackNavigation = (categories?: Array<{title: string, slug: {current: string}}>) => {
    if (!categories || categories.length === 0) {
      return { path: "/stories", label: "Back to Stories" };
    }

    const categorySlug = categories[0].slug.current;
    const categoryTitle = getLocalizedContent(categories[0].title) || categories[0].title;

    switch (categorySlug) {
      case "dancer-speak-up":
        return { path: "/dancer-speak-up", label: "Back to Dancer Speak Up" };
      case "choreographers-corner":
        return { path: "/choreographers-corner", label: "Back to Choreographers Corner" };
      case "money-moves":
        return { path: "/stories", label: "Back to Stories" };
      default:
        return { path: "/stories", label: "Back to Stories" };
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError("No article specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First try to get as regular article
        let articleData = await getArticle(slug);
        
        // If not found as article, try as featured story
        if (!articleData) {
          const featuredStoryData = await getFeaturedStoryBySlug(slug);
          
          if (featuredStoryData) {
            // Convert featured story to article format
            articleData = {
              _id: featuredStoryData._id,
              _type: 'article', // Convert to article type for display
              title: featuredStoryData.title,
              slug: featuredStoryData.slug,
              publishedAt: featuredStoryData.publishedAt,
              excerpt: featuredStoryData.excerpt,
              mainImage: featuredStoryData.mainImage,
              body: featuredStoryData.body || [],
              categories: [], // Featured stories don't have categories
              readTime: featuredStoryData.body ? Math.ceil(featuredStoryData.body.length / 3) : 5 // Rough estimate
            };
          }
        }
        
        if (!articleData) {
          setError("Story not found");
          navigate('/stories', { replace: true });
          return;
        }
        
        setArticle(articleData);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, navigate]);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-6 max-w-3xl">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6">
          {(() => {
            const backNav = getBackNavigation(article?.categories);
            return (
              <Link 
                to={backNav.path} 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backNav.label}
              </Link>
            );
          })()}
        </nav>

        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">{error}</h2>
              {(() => {
                const backNav = getBackNavigation(article?.categories);
                return (
                  <Link 
                    to={backNav.path} 
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {backNav.label}
                  </Link>
                );
              })()}
            </div>
          </div>
        ) : article ? (
          <article className="max-w-none">
            {/* Article Header */}
            <header className="mb-8">
              {article.categories?.length ? (
                <div className="mb-4">
                  {article.categories.map((category) => (
                    <span 
                      key={category._id || category.title}
                      className="inline-block px-3 py-1 text-xs font-medium text-primary border border-primary/30 bg-primary/5"
                    >
                      {getLocalizedContent(category.title) || category.title}
                    </span>
                  ))}
                </div>
              ) : null}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                {getLocalizedContent(article.title) || article.title}
              </h1>
              
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                {article.publishedAt && (
                  <time dateTime={article.publishedAt} className="mr-6">
                    {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                  </time>
                )}
                {article.readTime && (
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                    {article.readTime} min read
                  </span>
                )}
              </div>
            </header>

            {/* Featured Image - Clean and minimal */}
            {article.mainImage && (
              <div className="mb-8">
                <img
                  src={urlFor(article.mainImage)?.quality(100).url() || "/DG Monogram Letters ONLY Digital Black.png"}
                  alt={getLocalizedContent(article.title) || article.title}
                  className="w-full h-auto object-contain rounded-lg shadow-lg border border-white/10"
                  style={{ maxWidth: 'none', width: '100%', height: 'auto' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/DG Monogram Letters ONLY Digital Black.png";
                  }}
                />
              </div>
            )}

            {/* Article Excerpt */}
            {article.excerpt && (
              <div className="mb-8">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {getLocalizedContent(article.excerpt) || article.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-xl dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-muted/10 prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-li:text-foreground prose-ul:my-6 prose-ol:my-6">
              {(() => {
                const bodyContent = getLocalizedContent(article.body) || article.body || [];
                // Ensure we have an array for PortableText
                const content = Array.isArray(bodyContent) ? bodyContent : [];
                
                if (content.length === 0) {
                  return (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Content not available.</p>
                    </div>
                  );
                }
                
                return (
                  <PortableText
                    value={content}
                    components={{
                      types: {
                        image: ({ value }) => (
                          <div className="my-12">
                            <img
                              src={urlFor(value)?.quality(100).url() || "/DG Monogram Letters ONLY Digital Black.png"}
                              alt={value.alt || ''}
                              className="w-full h-auto object-contain rounded-lg shadow-lg border border-white/10"
                              style={{ maxWidth: 'none', width: '100%', height: 'auto' }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/DG Monogram Letters ONLY Digital Black.png";
                              }}
                            />
                            {value.caption && (
                              <p className="text-sm text-muted-foreground mt-4 text-center">
                                {value.caption}
                              </p>
                            )}
                          </div>
                        ),
                      },
                    }}
                  />
                );
              })()}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>Published {article.publishedAt && format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
                  {article.readTime && (
                    <span>• {article.readTime} min read</span>
                  )}
                </div>
                <Link 
                  to="/stories" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  ← Back to Stories
                </Link>
              </div>
            </footer>
          </article>
        ) : null}
      </div>
    </PageLayout>
  );
}
