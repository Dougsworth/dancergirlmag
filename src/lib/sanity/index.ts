// src/lib/sanity/index.ts
// Main entry point for Sanity integration
// Clean, organized structure for DancerGirl Magazine CMS

export * from './client';
export * from './types';
export * from './queries';
export * from './utils';

// Re-export everything for backward compatibility
export * from './queries/articles';
export * from './queries/artists';
export * from './queries/choreographers';
export * from './queries/events';
export * from './queries/featured-stories';
export * from './queries/dancers-of-month';