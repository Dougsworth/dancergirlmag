// src/lib/sanity/queries/index.ts
// Main queries export file

// Re-export all query functions for easy importing
export * from './articles';
export * from './artists'; 
export * from './choreographers';
export * from './events';
export * from './featured-stories';
export * from './dancers-of-month';
export * from './founder';
export * from './editor-letters';
export * from './photo-repository';

// Legacy exports for backward compatibility - will be removed in future version
export { getArticles } from './articles';
export { getArtists } from './artists';
export { getChoreographers } from './choreographers';
export { getEvents } from './events';
export { getFeaturedStories } from './featured-stories';
export { getDancersOfMonth } from './dancers-of-month';
export { getEditorLetters, getEditorLetterBySlug, getFeaturedEditorLetter } from './editor-letters';