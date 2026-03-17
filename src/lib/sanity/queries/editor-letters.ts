// src/lib/sanity/queries/editor-letters.ts
// Editor letter queries

import { sanityFetch, getLocalizedContent, getCurrentLanguage } from '../client';
import type { SanityEditorLetter } from '../types';

// ==================== EDITOR LETTERS ====================

/**
 * Get all editor letters with optional pagination and filtering
 */
export async function getEditorLetters(options?: {
  limit?: number;
  offset?: number;
  featured?: boolean;
  tags?: string[];
}): Promise<SanityEditorLetter[]> {
  const { limit = 10, offset = 0, featured, tags } = options || {};
  
  // Build filter conditions
  const conditions = [];
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }
  if (tags && tags.length > 0) {
    const tagConditions = tags.map(tag => `"${tag}" in tags`).join(' || ');
    conditions.push(`(${tagConditions})`);
  }
  
  const whereClause = conditions.length > 0 ? ` && (${conditions.join(' && ')})` : '';
  
  const query = `*[_type == "editorLetter"${whereClause}] | order(publishedAt desc) [${offset}...${offset + limit}] {
    _id,
    _type,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    publishedAt,
    featured,
    tags,
    seoTitle,
    seoDescription,
    author->{
      _id,
      name,
      title,
      image,
      bio,
      socialLinks
    }
  }`;

  try {
    const letters = await sanityFetch<SanityEditorLetter[]>(query);
    if (!letters) return [];

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return letters.map(letter => ({
      ...letter,
      title: getLocalizedContent(letter.title, lang) || letter.title,
      excerpt: getLocalizedContent(letter.excerpt, lang) || letter.excerpt,
      content: getLocalizedContent(letter.content, lang) || letter.content,
      seoTitle: getLocalizedContent(letter.seoTitle, lang) || letter.seoTitle,
      seoDescription: getLocalizedContent(letter.seoDescription, lang) || letter.seoDescription,
    }));
  } catch (error) {
    console.error('Error fetching editor letters:', error);
    return [];
  }
}

/**
 * Get a single editor letter by slug
 */
export async function getEditorLetterBySlug(slug: string): Promise<SanityEditorLetter | null> {
  const query = `*[_type == "editorLetter" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    publishedAt,
    featured,
    tags,
    seoTitle,
    seoDescription,
    author->{
      _id,
      name,
      title,
      image,
      bio,
      socialLinks
    }
  }`;

  try {
    const letter = await sanityFetch<SanityEditorLetter>(query, { slug });
    if (!letter) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...letter,
      title: getLocalizedContent(letter.title, lang) || letter.title,
      excerpt: getLocalizedContent(letter.excerpt, lang) || letter.excerpt,
      content: getLocalizedContent(letter.content, lang) || letter.content,
      seoTitle: getLocalizedContent(letter.seoTitle, lang) || letter.seoTitle,
      seoDescription: getLocalizedContent(letter.seoDescription, lang) || letter.seoDescription,
    };
  } catch (error) {
    console.error('Error fetching editor letter by slug:', error);
    return null;
  }
}

/**
 * Get the featured editor letter
 */
export async function getFeaturedEditorLetter(): Promise<SanityEditorLetter | null> {
  const query = `*[_type == "editorLetter" && featured == true] | order(publishedAt desc) [0] {
    _id,
    _type,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    publishedAt,
    featured,
    tags,
    seoTitle,
    seoDescription,
    author->{
      _id,
      name,
      title,
      image,
      bio,
      socialLinks
    }
  }`;

  try {
    const letter = await sanityFetch<SanityEditorLetter>(query);
    if (!letter) {
      // If no featured letter, get the most recent one
      return getLatestEditorLetter();
    }

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...letter,
      title: getLocalizedContent(letter.title, lang) || letter.title,
      excerpt: getLocalizedContent(letter.excerpt, lang) || letter.excerpt,
      content: getLocalizedContent(letter.content, lang) || letter.content,
      seoTitle: getLocalizedContent(letter.seoTitle, lang) || letter.seoTitle,
      seoDescription: getLocalizedContent(letter.seoDescription, lang) || letter.seoDescription,
    };
  } catch (error) {
    console.error('Error fetching featured editor letter:', error);
    return null;
  }
}

/**
 * Get the latest editor letter
 */
export async function getLatestEditorLetter(): Promise<SanityEditorLetter | null> {
  const query = `*[_type == "editorLetter"] | order(publishedAt desc) [0] {
    _id,
    _type,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    publishedAt,
    featured,
    tags,
    seoTitle,
    seoDescription,
    author->{
      _id,
      name,
      title,
      image,
      bio,
      socialLinks
    }
  }`;

  try {
    const letter = await sanityFetch<SanityEditorLetter>(query);
    if (!letter) return null;

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return {
      ...letter,
      title: getLocalizedContent(letter.title, lang) || letter.title,
      excerpt: getLocalizedContent(letter.excerpt, lang) || letter.excerpt,
      content: getLocalizedContent(letter.content, lang) || letter.content,
      seoTitle: getLocalizedContent(letter.seoTitle, lang) || letter.seoTitle,
      seoDescription: getLocalizedContent(letter.seoDescription, lang) || letter.seoDescription,
    };
  } catch (error) {
    console.error('Error fetching latest editor letter:', error);
    return null;
  }
}

/**
 * Get all unique tags used in editor letters
 */
export async function getEditorLetterTags(): Promise<string[]> {
  const query = `array::unique(*[_type == "editorLetter" && defined(tags)].tags[])`;

  try {
    const tags = await sanityFetch<string[]>(query);
    return tags || [];
  } catch (error) {
    console.error('Error fetching editor letter tags:', error);
    return [];
  }
}

/**
 * Get editor letters by tag
 */
export async function getEditorLettersByTag(tag: string, limit = 10): Promise<SanityEditorLetter[]> {
  const query = `*[_type == "editorLetter" && "${tag}" in tags] | order(publishedAt desc) [0...${limit}] {
    _id,
    _type,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    publishedAt,
    featured,
    tags,
    seoTitle,
    seoDescription,
    author->{
      _id,
      name,
      title,
      image,
      bio,
      socialLinks
    }
  }`;

  try {
    const letters = await sanityFetch<SanityEditorLetter[]>(query);
    if (!letters) return [];

    // Transform internationalized fields
    const lang = getCurrentLanguage();
    return letters.map(letter => ({
      ...letter,
      title: getLocalizedContent(letter.title, lang) || letter.title,
      excerpt: getLocalizedContent(letter.excerpt, lang) || letter.excerpt,
      content: getLocalizedContent(letter.content, lang) || letter.content,
      seoTitle: getLocalizedContent(letter.seoTitle, lang) || letter.seoTitle,
      seoDescription: getLocalizedContent(letter.seoDescription, lang) || letter.seoDescription,
    }));
  } catch (error) {
    console.error('Error fetching editor letters by tag:', error);
    return [];
  }
}