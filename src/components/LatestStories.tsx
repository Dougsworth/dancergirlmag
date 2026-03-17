import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getArticles, getFeaturedArticles, urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import { useTranslation } from "react-i18next";

const LatestStories = () => {
  const { t } = useTranslation();
  const refreshKey = useLanguageRefresh();
  const [articles, setArticles] = useState<Array<any>>([]);
  const [popularArticles, setPopularArticles] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [articlesData, popularData] = await Promise.all([
          // Get latest 6 articles
          getArticles({ limit: 6 }),
          // Get 3 featured articles
          getFeaturedArticles(3),
        ]);
        setArticles(articlesData);
        setPopularArticles(popularData);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [refreshKey]);

  if (loading) {
    return (
      <section className="py-20 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="animate-pulse space-y-8">
                <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {t('sections.latestStories')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('sections.latestStoriesDescription')}
              </p>
            </motion.div>

            {articles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('stories.noArticlesYet')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t('stories.addArticles')}
                  </p>
                  <Link
                    to="/stories"
                    className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-md"
                  >
                    {t('stories.browseAll')}
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.slice(0, 4).map((article: any, index: number) => (
                  <motion.article
                    key={article._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/article/${article.slug?.current || article._id}`}>
                      <div className="relative mb-6 overflow-hidden rounded-lg">
                        {article.mainImage ? (
                          <img
                            src={urlFor(article.mainImage).width(800).height(450).url()}
                            alt={article.title}
                            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/DG Monogram Letters ONLY Digital Black.png";
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500 text-sm">
                              {t('stories.noImage')}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {article.categories?.[0]?.title && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold text-white bg-black/70 dark:bg-white/90 dark:text-gray-900 rounded">
                              {article.categories[0].title.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          {article.author && (
                            <span className="font-medium text-gray-900 dark:text-gray-200">
                              {article.author}
                            </span>
                          )}
                          {article.publishedAt && (
                            <>
                              {article.author && (
                                <span className="mx-2">•</span>
                              )}
                              <span>
                                {format(
                                  new Date(article.publishedAt),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            {articles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-12"
              >
                <Link
                  to="/stories"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-900 dark:border-white text-lg font-semibold rounded-none text-gray-900 dark:text-white hover:bg-gray-800 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-all duration-300"
                >
                  {t('stories.viewAll')}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Most Popular */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <svg
                  className="w-5 h-5 text-pink-600 dark:text-pink-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('stories.mostPopular')}
                </h3>
              </div>
              <div className="space-y-4">
                {popularArticles.slice(0, 4).map((article: any) => (
                  <div
                    key={article._id}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                  >
                    <Link to={`/article/${article.slug?.current || article._id}`}>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {article.author || "DancerGirl"}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {article.readTime
                            ? `${article.readTime} ${t('stories.minRead')}`
                            : `5 ${t('stories.minRead')}`}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Featured Dancer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <svg
                  className="w-5 h-5 text-pink-600 dark:text-pink-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('stories.featuredDancer')}
                </h3>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-700 dark:to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Keisha Williams
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t('stories.keishaDesc')}
                </p>
                <Link
                  to="/artists"
                  className="inline-flex items-center text-sm font-medium text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                >
                  {t('stories.viewProfile')} →
                </Link>
              </div>
            </motion.div>

            {/* Watch Latest */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900 dark:bg-gray-800 text-white p-6 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <svg
                  className="w-5 h-5 text-pink-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold">{t('stories.watchLatest')}</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                {t('stories.exclusiveContent')}
              </p>
              <Link
                to="/watch"
                className="inline-flex items-center text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
              >
                {t('stories.exploreVideos')} →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestStories;
