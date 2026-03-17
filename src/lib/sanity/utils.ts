// src/lib/sanity/utils.ts
// Utility functions for content processing

/**
 * Calculate estimated reading time based on content
 */
export function calculateReadTime(content: any[] | string | null): number {
  if (!content) return 1;
  
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (Array.isArray(content)) {
    text = content
      .filter(block => block._type === 'block')
      .map(block => 
        block.children
          ?.filter((child: any) => child._type === 'span')
          .map((span: any) => span.text)
          .join('') || ''
      )
      .join(' ');
  }
  
  const wordCount = text.split(/\s+/).length;
  // Average reading speed: 200 words per minute
  return Math.max(1, Math.round(wordCount / 200));
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Create SEO-friendly slug from title
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Check if content is available in multiple languages
 */
export function isMultilingual(content: any): boolean {
  return typeof content === 'object' && 
         content !== null && 
         (content.en || content.es);
}

/**
 * Get all available languages from multilingual content
 */
export function getAvailableLanguages(content: any): string[] {
  if (!isMultilingual(content)) return ['en'];
  const languages = [];
  if (content.en) languages.push('en');
  if (content.es) languages.push('es');
  return languages;
}

// Export all image utilities
export * from './utils/image';