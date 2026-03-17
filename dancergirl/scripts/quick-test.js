// Simple test script to add content via Sanity Studio
// Run this in your browser console when Sanity Studio is open

console.log('🚀 Quick Test Content Generator')
console.log('Run this in your browser console at http://localhost:3333')

const testContent = {
  categories: [
    {
      title: 'Guides',
      slug: 'guides',
      description: 'Step-by-step guides and tutorials for Caribbean dance styles',
      color: 'pink',
    },
    {
      title: 'Wah a Gwaan',
      slug: 'wah-a-gwaan',
      description: 'Latest news and updates from the Caribbean dance scene',
      color: 'purple',
    },
    {
      title: "Choreographer's Corner",
      slug: 'choreographers-corner',
      description: 'Insights and tips from professional choreographers',
      color: 'blue',
    },
    {
      title: 'Money Moves',
      slug: 'money-moves',
      description: 'Business advice and opportunities in the dance industry',
      color: 'green',
    },
    {
      title: 'Newsletter',
      slug: 'newsletter',
      description: 'Weekly newsletter content and updates',
      color: 'orange',
    },
  ],

  authors: [
    {
      name: 'Keisha Williams',
      slug: 'keisha-williams',
      bio: 'International dancehall champion and choreographer from Kingston, Jamaica. Known for innovative fusion of traditional and contemporary styles.',
    },
    {
      name: 'Marcus Thompson',
      slug: 'marcus-thompson',
      bio: 'Dance educator and cultural preservationist with over 15 years of experience in Caribbean dance forms.',
    },
  ],

  articles: [
    {
      title: 'Mastering Dancehall Foundations: A Complete Guide',
      slug: 'mastering-dancehall-foundations',
      excerpt:
        'Learn the essential moves and techniques that form the foundation of Dancehall dance. From basic steps to advanced combinations, this comprehensive guide will take you from beginner to confident dancer.',
      readTime: 8,
      featured: true,
      category: 'Guides',
      author: 'Keisha Williams',
    },
    {
      title: 'The Business of Dance: Building Your Career in the Caribbean',
      slug: 'business-of-dance-caribbean',
      excerpt:
        'Discover how to turn your passion for Caribbean dance into a sustainable career. From teaching to performing, learn the strategies that successful dancers use to build their businesses.',
      readTime: 12,
      featured: true,
      category: 'Money Moves',
      author: 'Marcus Thompson',
    },
    {
      title: 'Soca vs Dancehall: Understanding the Differences',
      slug: 'soca-vs-dancehall-differences',
      excerpt:
        'Explore the distinct characteristics of Soca and Dancehall dance styles. Learn about their origins, movements, and cultural significance in Caribbean dance culture.',
      readTime: 6,
      featured: false,
      category: 'Guides',
      author: 'Keisha Williams',
    },
    {
      title: "Latest Dancehall Trends: What's Hot in 2024",
      slug: 'latest-dancehall-trends-2024',
      excerpt:
        "Stay up to date with the latest moves and trends in Dancehall culture. From viral TikTok dances to underground club moves, discover what's making waves this year.",
      readTime: 5,
      featured: false,
      category: 'Wah a Gwaan',
      author: 'Marcus Thompson',
    },
    {
      title: 'Choreography Tips from the Pros',
      slug: 'choreography-tips-from-pros',
      excerpt:
        'Professional choreographers share their secrets for creating compelling dance routines. Learn how to structure your choreography, choose music, and develop your unique style.',
      readTime: 10,
      featured: false,
      category: "Choreographer's Corner",
      author: 'Keisha Williams',
    },
  ],
}

console.log('\n📋 Test Content Ready:')
console.log('Categories:', testContent.categories.length)
console.log('Authors:', testContent.authors.length)
console.log('Articles:', testContent.articles.length)

console.log('\n📝 Manual Steps:')
console.log('1. Go to http://localhost:3333')
console.log('2. Click "Category" in left sidebar')
console.log('3. Click "+" to add each category')
console.log('4. Click "Author" and add authors')
console.log('5. Click "Article" and add articles')
console.log('6. Visit your website to see the content!')

// Make content available globally for easy copy/paste
window.testContent = testContent
console.log('\n✅ Content available as window.testContent')
