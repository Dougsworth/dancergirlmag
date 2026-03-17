// Migration script to convert category fields from simple strings to internationalized format
// Run this script with: node migrations/migrateCategoryFields.js

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
  useCdn: false
});

async function migrateCategories() {
  console.log('Starting category migration...');
  
  try {
    // Fetch all categories
    const categories = await client.fetch(`*[_type == "category"]`);
    console.log(`Found ${categories.length} categories to migrate`);
    
    for (const category of categories) {
      const patches = [];
      let needsUpdate = false;
      
      // Check if title needs migration
      if (category.title && typeof category.title === 'string') {
        console.log(`Migrating title for category: ${category.title}`);
        patches.push({
          id: category._id,
          patch: {
            set: {
              title: {
                _type: 'internationalizedString',
                en: category.title,
                es: category.title // Default to same as English, can be translated later
              }
            }
          }
        });
        needsUpdate = true;
      }
      
      // Check if description needs migration
      if (category.description && typeof category.description === 'string') {
        console.log(`Migrating description for category: ${category._id}`);
        patches.push({
          id: category._id,
          patch: {
            set: {
              description: {
                _type: 'internationalizedText',
                en: category.description,
                es: category.description // Default to same as English
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
            console.log(`✓ Updated category ${patchData.id}`);
          } catch (error) {
            console.error(`✗ Failed to update category ${patchData.id}:`, error);
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
migrateCategories();