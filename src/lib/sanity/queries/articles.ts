// src/lib/sanity/queries/articles.ts
// Article-related queries and functions

import { sanityFetch, getLocalizedContent, getCurrentLanguage } from '../client';
import { calculateReadTime } from '../utils';
import type { SanityArticle, ArticleQueryParams } from '../types';

// ==================== ARTICLE QUERIES ====================

/**
 * Get all articles with filtering and pagination
 */
export async function getArticles(params?: ArticleQueryParams): Promise<SanityArticle[]> {
  const { limit = 12, section, featured, excludeSections } = params || {};

  // Build query filters
  let filters = [
    '_type == "article"',
    '!(_id in path("drafts.**"))'
  ];

  if (featured !== undefined) {
    filters.push('featured == $featured');
  }

  if (section) {
    filters.push('section == $section');
  }

  // Handle excluded sections
  if (excludeSections && excludeSections.length > 0) {
    excludeSections.forEach((_, index) => {
      filters.push(`section != $excludeSection${index}`);
    });
  }

  const query = `*[${filters.join(' && ')}] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    section,
    body,
    author,
    featured
  }`;

  // Build query parameters
  const queryParams: Record<string, any> = { limit };

  if (featured !== undefined) queryParams.featured = featured;
  if (section) queryParams.section = section;

  if (excludeSections && excludeSections.length > 0) {
    excludeSections.forEach((excludeSection, index) => {
      queryParams[`excludeSection${index}`] = excludeSection;
    });
  }

  const articles = await sanityFetch<SanityArticle[]>(query, queryParams);

  // Transform internationalized fields and calculate readTime
  const lang = getCurrentLanguage();
  return articles.map(article => ({
    ...article,
    title: getLocalizedContent(article.title, lang) || article.title,
    excerpt: getLocalizedContent(article.excerpt, lang) || article.excerpt,
    body: getLocalizedContent(article.body, lang) || article.body,
    readTime: calculateReadTime(getLocalizedContent(article.body, lang) || article.body)
  }));
}

/**
 * Get a single article by slug
 */
export async function getArticle(slug: string): Promise<SanityArticle | null> {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage,
    section,
    author,
    featured
  }`;

  const article = await sanityFetch<SanityArticle | null>(query, { slug });

  if (!article) return null;

  // Transform internationalized fields
  const lang = getCurrentLanguage();
  return {
    ...article,
    title: getLocalizedContent(article.title, lang) || article.title,
    excerpt: getLocalizedContent(article.excerpt, lang) || article.excerpt,
    body: getLocalizedContent(article.body, lang) || article.body,
    readTime: calculateReadTime(getLocalizedContent(article.body, lang) || article.body)
  };
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit: number = 6): Promise<SanityArticle[]> {
  return getArticles({ limit, featured: true });
}

/**
 * Get articles by section
 */
export async function getArticlesBySection(
  section: string,
  limit: number = 12
): Promise<SanityArticle[]> {
  return getArticles({ limit, section });
}

/**
 * Get recent articles
 */
export async function getRecentArticles(limit: number = 5): Promise<SanityArticle[]> {
  return getArticles({ limit });
}
