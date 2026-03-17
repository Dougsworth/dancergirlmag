// Migration script to fix string titles and author references
// Run this script with: npx sanity exec migrations/fixStringTitlesAndAuthor.js --with-user-token

import { createClient } from '@sanity/client';
// Simple translation function for migration
function translateText(text) {
  const translations = {
    'guides': 'guías',
    'story': 'historia', 
    'Mastering the Butterfly Move': 'Dominando el Movimiento Mariposa',
    'Caribbean Dance Festivals 2024': 'Festivales de Baile Caribeño 2024',
    'The Evolution of Soca Dance': 'La Evolución del Baile Soca',
    'Mastering Dancehall Foundations': 'Dominando los Fundamentos del Dancehall',
    'Interview: Queen of Dancehall': 'Entrevista: Reina del Dancehall',
    'Nutrition for Dancers': 'Nutrición para Bailarines',
    'The History of Dancehall in Jamaica': 'La Historia del Dancehall en Jamaica'
  };
  
  return translations[text] || text;
}

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function fixArticles() {
  console.log('Starting article fixes...');
  
  try {
    // First, find the correct Shanice Neita author (the one with profile picture, older one)
    const correctShanice = await client.fetch(`
      *[_type == "author" && slug.current == "shanice-neita"] | order(_createdAt asc)[0] {
        _id,
        _createdAt,
        title
      }
    `);
    
    console.log('Found correct Shanice Neita:', correctShanice);
    
    // Find all articles with string titles
    const articlesWithStringTitles = await client.fetch(`
      *[_type == "article" && title != null && !(title._type == "internationalizedString")] {
        _id,
        title,
        author,
        excerpt
      }
    `);
    
    console.log(`Found ${articlesWithStringTitles.length} articles with string titles`);
    
    for (const article of articlesWithStringTitles) {
      console.log(`\nFixing article: ${article._id}`);
      console.log(`Current title: ${article.title}`);
      
      const patches = {};
      
      // Fix title if it's a string
      if (typeof article.title === 'string') {
        const spanishTitle = translateText(article.title);
        patches.title = {
          _type: 'internationalizedString',
          en: article.title,
          es: spanishTitle
        };
        console.log(`Title: ${article.title} -> Spanish: ${spanishTitle}`);
      }
      
      // Fix excerpt if it's a string
      if (article.excerpt && typeof article.excerpt === 'string') {
        const spanishExcerpt = translateText(article.excerpt);
        patches.excerpt = {
          _type: 'internationalizedText',
          en: article.excerpt,
          es: spanishExcerpt
        };
        console.log(`Excerpt migrated to internationalized format`);
      }
      
      // Fix author reference if needed
      if (article.author && article.author._ref !== correctShanice._id) {
        patches.author = {
          _type: 'reference',
          _ref: correctShanice._id
        };
        console.log(`Author reference updated to correct Shanice`);
      }
      
      // Apply all patches
      if (Object.keys(patches).length > 0) {
        try {
          await client.patch(article._id).set(patches).commit();
          console.log(`✓ Successfully updated article ${article._id}`);
        } catch (error) {
          console.error(`✗ Failed to update article ${article._id}:`, error.message);
        }
      } else {
        console.log(`No changes needed for article ${article._id}`);
      }
    }
    
    console.log('\nArticle fixes completed!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Also fix categories with string titles
async function fixCategories() {
  console.log('\nStarting category fixes...');
  
  try {
    const categoriesWithStringTitles = await client.fetch(`
      *[_type == "category" && title != null && !(title._type == "internationalizedString")] {
        _id,
        title,
        description
      }
    `);
    
    console.log(`Found ${categoriesWithStringTitles.length} categories with string titles`);
    
    for (const category of categoriesWithStringTitles) {
      console.log(`\nFixing category: ${category._id}`);
      console.log(`Current title: ${category.title}`);
      
      const patches = {};
      
      // Fix title if it's a string
      if (typeof category.title === 'string') {
        const spanishTitle = translateText(category.title);
        patches.title = {
          _type: 'internationalizedString',
          en: category.title,
          es: spanishTitle
        };
        console.log(`Title: ${category.title} -> Spanish: ${spanishTitle}`);
      }
      
      // Fix description if it's a string
      if (category.description && typeof category.description === 'string') {
        const spanishDescription = translateText(category.description);
        patches.description = {
          _type: 'internationalizedText',
          en: category.description,
          es: spanishDescription
        };
        console.log(`Description migrated to internationalized format`);
      }
      
      // Apply patches
      if (Object.keys(patches).length > 0) {
        try {
          await client.patch(category._id).set(patches).commit();
          console.log(`✓ Successfully updated category ${category._id}`);
        } catch (error) {
          console.error(`✗ Failed to update category ${category._id}:`, error.message);
        }
      }
    }
    
    console.log('Category fixes completed!');
    
  } catch (error) {
    console.error('Category migration failed:', error);
  }
}

// Run both migrations
async function runMigrations() {
  await fixArticles();
  await fixCategories();
  console.log('\n🎉 All migrations completed!');
}

runMigrations();