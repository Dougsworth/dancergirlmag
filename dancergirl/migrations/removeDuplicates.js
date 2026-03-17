// Migration script to remove duplicate documents with same slugs
// Run this script with: npx sanity exec migrations/removeDuplicates.js --with-user-token

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function removeDuplicates() {
  console.log('Starting duplicate removal...');
  
  try {
    // Find all documents with duplicate slugs
    const duplicateQuery = `
      *[slug.current in ["arnella-bailey-britton", "shanice-neita"]] {
        _id,
        _type,
        title,
        "slug": slug.current,
        _createdAt,
        "editLink": "https://dancergirl.sanity.studio/intent/edit/id=" + _id
      } | order(slug.current, _createdAt)
    `;
    
    const duplicates = await client.fetch(duplicateQuery);
    console.log(`Found ${duplicates.length} documents with duplicate slugs:`);
    
    duplicates.forEach(doc => {
      console.log(`- ${doc._id} (${doc._type}) - ${doc.slug} - Created: ${doc._createdAt}`);
    });
    
    // Group by slug and remove newer duplicates
    const slugGroups = {};
    duplicates.forEach(doc => {
      if (!slugGroups[doc.slug]) {
        slugGroups[doc.slug] = [];
      }
      slugGroups[doc.slug].push(doc);
    });
    
    const toDelete = [];
    
    Object.entries(slugGroups).forEach(([slug, docs]) => {
      if (docs.length > 1) {
        // Sort by creation date, keep the oldest
        docs.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
        const [keep, ...remove] = docs;
        
        console.log(`\nFor slug "${slug}":`);
        console.log(`  KEEPING: ${keep._id} (${keep._type}) - Created: ${keep._createdAt}`);
        
        remove.forEach(doc => {
          console.log(`  REMOVING: ${doc._id} (${doc._type}) - Created: ${doc._createdAt}`);
          toDelete.push(doc._id);
        });
      }
    });
    
    if (toDelete.length === 0) {
      console.log('No duplicates to remove!');
      return;
    }
    
    console.log(`\nAbout to delete ${toDelete.length} duplicate documents:`);
    toDelete.forEach(id => console.log(`- ${id}`));
    
    // Delete the duplicates
    for (const id of toDelete) {
      try {
        await client.delete(id);
        console.log(`✓ Deleted ${id}`);
      } catch (error) {
        console.error(`✗ Failed to delete ${id}:`, error);
      }
    }
    
    console.log('Duplicate removal completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
removeDuplicates();