const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'f37vktt0', // Your project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to set this
  useCdn: false,
})

async function addTestContent() {
  try {
    console.log('🚀 Adding test content to Sanity...')

    // 1. Add Categories
    console.log('\n📂 Adding categories...')
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

    const categoryIds = {}
    for (const category of categories) {
      const result = await client.create(category)
      categoryIds[category.slug.current] = {_type: 'reference', _ref: result._id}
      console.log(`✅ Added category: ${category.title}`)
    }

    // 2. Add Authors
    console.log('\n👤 Adding authors...')
    const authors = [
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

    const authorIds = {}
    for (const author of authors) {
      const result = await client.create(author)
      authorIds[author.slug.current] = {_type: 'reference', _ref: result._id}
      console.log(`✅ Added author: ${author.name}`)
    }

    // 3. Add Articles
    console.log('\n📝 Adding articles...')
    const articles = [
      {
        _type: 'article',
        title: 'Mastering Dancehall Foundations: A Complete Guide',
        slug: {_type: 'slug', current: 'mastering-dancehall-foundations'},
        excerpt:
          'Learn the essential moves and techniques that form the foundation of Dancehall dance. From basic steps to advanced combinations, this comprehensive guide will take you from beginner to confident dancer.',
        publishedAt: '2024-12-15T10:00:00Z',
        readTime: 8,
        featured: true,
        author: authorIds['keisha-williams'],
        category: categoryIds['guides'],
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
        author: authorIds['marcus-thompson'],
        category: categoryIds['money-moves'],
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
        author: authorIds['keisha-williams'],
        category: categoryIds['guides'],
      },
      {
        _type: 'article',
        title: "Latest Dancehall Trends: What's Hot in 2024",
        slug: {_type: 'slug', current: 'latest-dancehall-trends-2024'},
        excerpt:
          "Stay up to date with the latest moves and trends in Dancehall culture. From viral TikTok dances to underground club moves, discover what's making waves this year.",
        publishedAt: '2024-12-12T10:00:00Z',
        readTime: 5,
        featured: false,
        author: authorIds['marcus-thompson'],
        category: categoryIds['wah-a-gwaan'],
      },
      {
        _type: 'article',
        title: 'Choreography Tips from the Pros',
        slug: {_type: 'slug', current: 'choreography-tips-from-pros'},
        excerpt:
          'Professional choreographers share their secrets for creating compelling dance routines. Learn how to structure your choreography, choose music, and develop your unique style.',
        publishedAt: '2024-12-11T10:00:00Z',
        readTime: 10,
        featured: false,
        author: authorIds['keisha-williams'],
        category: categoryIds['choreographers-corner'],
      },
    ]

    for (const article of articles) {
      await client.create(article)
      console.log(`✅ Added article: ${article.title}`)
    }

    console.log('\n🎉 Test content added successfully!')
    console.log('\n📊 Summary:')
    console.log(`- ${categories.length} categories`)
    console.log(`- ${authors.length} authors`)
    console.log(`- ${articles.length} articles`)
    console.log('\n🌐 Visit your website to see the content!')
  } catch (error) {
    console.error('❌ Error adding test content:', error)
  }
}

// Run the script
addTestContent()
