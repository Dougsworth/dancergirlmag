// src/lib/sanity.ts
// Main entry point for Sanity integration — re-exports organized modules

export * from './sanity/client';
export * from './sanity/types';
export * from './sanity/utils';
export * from './sanity/queries';

// Legacy aliases used in existing pages
import { getDancerOfMonthBySlug } from './sanity/queries/dancers-of-month';
export const getDancerOfTheMonthBySlug = getDancerOfMonthBySlug;
