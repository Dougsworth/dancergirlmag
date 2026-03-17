// Migration script to convert article fields from simple strings to internationalized format
// Run this script with: node migrations/migrateArticleFields.js

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
  useCdn: false
});

async function migrateArticles() {
  console.log('Starting article migration...');
  
  try {
    // Fetch all articles
    const articles = await client.fetch(`*[_type == "article"]`);
    console.log(`Found ${articles.length} articles to migrate`);
    
    for (const article of articles) {
      const patches = [];
      let needsUpdate = false;
      
      // Check if title needs migration
      if (article.title && typeof article.title === 'string') {
        console.log(`Migrating title for article: ${article.title}`);
        patches.push({
          id: article._id,
          patch: {
            set: {
              title: {
                _type: 'internationalizedString',
                en: article.title,
                es: article.title // Default to same as English, can be translated later
              }
            }
          }
        });
        needsUpdate = true;
      }
      
      // Check if excerpt needs migration
      if (article.excerpt && typeof article.excerpt === 'string') {
        console.log(`Migrating excerpt for article: ${article._id}`);
        patches.push({
          id: article._id,
          patch: {
            set: {
              excerpt: {
                _type: 'internationalizedText',
                en: article.excerpt,
                es: article.excerpt // Default to same as English
              }
            }
          }
        });
        needsUpdate = true;
      }
      
      // Apply patches if needed
      if (needsUpdate && patches.length > 0) {
        for (const patchData of patches) {
          try {
            await client.patch(patchData.id).set(patchData.patch.set).commit();
            console.log(`✓ Updated article ${patchData.id}`);
          } catch (error) {
            console.error(`✗ Failed to update article ${patchData.id}:`, error);
          }
        }
      }
    }
    
    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
migrateArticles();