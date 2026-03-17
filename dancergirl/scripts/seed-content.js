// This script helps you seed initial content in Sanity
// Run this in your Sanity Studio or use it as a reference

const categories = [
  {
    _type: 'category',
    title: 'Guides',
    slug: {_type: 'slug', current: 'guides'},
    description: 'Step-by-step guides and tutorials for Caribbean dance styles',
    color: 'pink',
  },
  {
    _type: 'category',
    title: 'Wah a Gwaan',
    slug: {_type: 'slug', current: 'wah-a-gwaan'},
    description: 'Latest news and updates from the Caribbean dance scene',
    color: 'purple',
  },
  {
    _type: 'category',
    title: "Choreographer's Corner",
    slug: {_type: 'slug', current: 'choreographers-corner'},
    description: 'Insights and tips from professional choreographers',
    color: 'blue',
  },
  {
    _type: 'category',
    title: 'Money Moves',
    slug: {_type: 'slug', current: 'money-moves'},
    description: 'Business advice and opportunities in the dance industry',
    color: 'green',
  },
  {
    _type: 'category',
    title: 'Newsletter',
    slug: {_type: 'slug', current: 'newsletter'},
    description: 'Weekly newsletter content and updates',
    color: 'orange',
  },
]

const sampleAuthors = [
  {
    _type: 'author',
    name: 'Keisha Williams',
    slug: {_type: 'slug', current: 'keisha-williams'},
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'International dancehall champion and choreographer from Kingston, Jamaica. Known for innovative fusion of traditional and contemporary styles.',
          },
        ],
      },
    ],
  },
  {
    _type: 'author',
    name: 'Marcus Thompson',
    slug: {_type: 'slug', current: 'marcus-thompson'},
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Dance educator and cultural preservationist with over 15 years of experience in Caribbean dance forms.',
          },
        ],
      },
    ],
  },
]

const sampleArticles = [
  {
    _type: 'article',
    title: 'Mastering Dancehall Foundations: A Complete Guide',
    slug: {_type: 'slug', current: 'mastering-dancehall-foundations'},
    excerpt:
      'Learn the essential moves and techniques that form the foundation of Dancehall dance. From basic steps to advanced combinations, this comprehensive guide will take you from beginner to confident dancer.',
    publishedAt: '2024-12-15T10:00:00Z',
    readTime: 8,
    featured: true,
    // Note: You'll need to add actual image assets and author/category references
    // These are just examples of the structure
  },
  {
    _type: 'article',
    title: 'The Business of Dance: Building Your Career in the Caribbean',
    slug: {_type: 'slug', current: 'business-of-dance-caribbean'},
    excerpt:
      'Discover how to turn your passion for Caribbean dance into a sustainable career. From teaching to performing, learn the strategies that successful dancers use to build their businesses.',
    publishedAt: '2024-12-14T10:00:00Z',
    readTime: 12,
    featured: true,
  },
  {
    _type: 'article',
    title: 'Soca vs Dancehall: Understanding the Differences',
    slug: {_type: 'slug', current: 'soca-vs-dancehall-differences'},
    excerpt:
      'Explore the distinct characteristics of Soca and Dancehall dance styles. Learn about their origins, movements, and cultural significance in Caribbean dance culture.',
    publishedAt: '2024-12-13T10:00:00Z',
    readTime: 6,
    featured: false,
  },
]

console.log('Sample content structure:')
console.log('\nCategories:', categories)
console.log('\nAuthors:', sampleAuthors)
console.log('\nArticles:', sampleArticles)

console.log('\nTo add this content to Sanity:')
console.log('1. Go to your Sanity Studio (http://localhost:3333)')
console.log('2. Create the categories first')
console.log('3. Create the authors')
console.log('4. Create articles and reference the categories and authors')
console.log('5. Add images to the articles')
