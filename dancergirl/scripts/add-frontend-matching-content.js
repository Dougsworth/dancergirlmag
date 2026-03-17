import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id', // Replace with your actual project ID
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'your-token', // Replace with your actual token
  useCdn: false,
})

// Featured Stories (matches "Featured Stories" section)
const featuredStories = [
  {
    _type: 'article',
    title: 'The Evolution of DancerGirl: From Street to Stage',
    slug: {_type: 'slug', current: 'evolution-of-dancergirl'},
    excerpt:
      'Discover how DancerGirl has transformed from underground street dance to mainstream recognition, celebrating the journey of dance culture.',
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    featured: true,
    category: {_type: 'reference', _ref: 'category-featured-stories'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "DancerGirl represents more than just dance—it's a movement that has captured the hearts of millions worldwide. From its humble beginnings in the streets to commanding stages at major festivals, the journey has been nothing short of extraordinary.",
          },
        ],
      },
    ],
  },
  {
    _type: 'article',
    title: 'Breaking Barriers: Women in Dance Leadership',
    slug: {_type: 'slug', current: 'women-dance-leadership'},
    excerpt:
      'Meet the trailblazing women who are reshaping the dance industry and creating opportunities for the next generation of dancers.',
    publishedAt: '2024-01-10T14:30:00Z',
    readTime: 6,
    featured: true,
    category: {_type: 'reference', _ref: 'category-featured-stories'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The dance world is witnessing a powerful shift as more women take on leadership roles in choreography, studio ownership, and festival organization. This article explores the stories of these remarkable women and their impact on the industry.',
          },
        ],
      },
    ],
  },
]

// Dance Tutorials (matches "Dance Tutorials" section)
const danceTutorials = [
  {
    _type: 'article',
    title: 'Master the Butterfly Move: Step-by-Step Guide',
    slug: {_type: 'slug', current: 'butterfly-move-tutorial'},
    excerpt:
      'Learn the iconic butterfly dance move that has taken social media by storm. Perfect for beginners looking to add this viral move to their repertoire.',
    publishedAt: '2024-01-12T09:00:00Z',
    readTime: 4,
    featured: false,
    category: {_type: 'reference', _ref: 'category-dance-tutorials'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The butterfly move is one of the most recognizable dance moves in contemporary dance culture. This tutorial will break down the technique step by step, ensuring you can master this viral sensation.',
          },
        ],
      },
    ],
  },
  {
    _type: 'article',
    title: 'Advanced Soca Techniques for Festival Season',
    slug: {_type: 'slug', current: 'advanced-soca-techniques'},
    excerpt:
      'Elevate your Soca dance skills with advanced techniques perfect for carnival and festival performances.',
    publishedAt: '2024-01-08T16:00:00Z',
    readTime: 7,
    featured: false,
    category: {_type: 'reference', _ref: 'category-dance-tutorials'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Soca dancing is all about energy, rhythm, and cultural expression. This advanced tutorial will teach you complex combinations and techniques that will make you stand out at any festival.',
          },
        ],
      },
    ],
  },
]

// Trending Now (matches "Trending Now" section)
const trendingStories = [
  {
    _type: 'article',
    title: 'Viral Dance Challenge: #DancerGirlChallenge Takes Over TikTok',
    slug: {_type: 'slug', current: 'dancergirl-challenge-tiktok'},
    excerpt:
      'The #DancerGirlChallenge has amassed over 50 million views on TikTok, with dancers from around the world participating in this viral sensation.',
    publishedAt: '2024-01-14T12:00:00Z',
    readTime: 5,
    featured: false,
    category: {_type: 'reference', _ref: 'category-trending-now'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'What started as a simple dance routine has become a global phenomenon. The #DancerGirlChallenge has brought together dancers from every corner of the world, creating a community united by the love of dance.',
          },
        ],
      },
    ],
  },
  {
    _type: 'article',
    title: 'Festival Season 2024: What to Expect',
    slug: {_type: 'slug', current: 'festival-season-2024'},
    excerpt:
      'Get ready for the biggest dance festivals of 2024, featuring exclusive lineups, new venues, and innovative experiences.',
    publishedAt: '2024-01-13T15:30:00Z',
    readTime: 6,
    featured: false,
    category: {_type: 'reference', _ref: 'category-trending-now'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '2024 is set to be the biggest year yet for dance festivals, with new venues, innovative experiences, and world-class lineups that will redefine what it means to celebrate dance culture.',
          },
        ],
      },
    ],
  },
]

// Latest from DancerGirl (matches "Latest from DancerGirl" section)
const latestFromDancerGirl = [
  {
    _type: 'article',
    title: 'Behind the Scenes: A Day in the Life of a Professional Dancer',
    slug: {_type: 'slug', current: 'day-life-professional-dancer'},
    excerpt:
      'Follow a professional dancer through their daily routine, from morning warm-ups to evening performances.',
    publishedAt: '2024-01-16T08:00:00Z',
    readTime: 5,
    featured: false,
    category: {_type: 'reference', _ref: 'category-latest-from-dancergirl'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ever wondered what it takes to be a professional dancer? This behind-the-scenes look reveals the dedication, discipline, and passion required to succeed in the competitive world of dance.',
          },
        ],
      },
    ],
  },
  {
    _type: 'article',
    title: 'The Future of Dance: Technology Meets Tradition',
    slug: {_type: 'slug', current: 'future-dance-technology'},
    excerpt:
      'Explore how technology is revolutionizing dance education, performance, and audience engagement.',
    publishedAt: '2024-01-15T16:00:00Z',
    readTime: 7,
    featured: false,
    category: {_type: 'reference', _ref: 'category-latest-from-dancergirl'},
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'From virtual reality dance classes to AI-powered choreography tools, technology is transforming how we learn, create, and experience dance. Discover the innovations shaping the future of the art form.',
          },
        ],
      },
    ],
  },
]

async function addFrontendMatchingContent() {
  try {
    console.log('Adding Featured Stories...')
    for (const story of featuredStories) {
      const result = await client.create(story)
      console.log(`Created featured story: ${result.title}`)
    }

    console.log('Adding Dance Tutorials...')
    for (const tutorial of danceTutorials) {
      const result = await client.create(tutorial)
      console.log(`Created tutorial: ${result.title}`)
    }

    console.log('Adding Trending Stories...')
    for (const story of trendingStories) {
      const result = await client.create(story)
      console.log(`Created trending story: ${result.title}`)
    }

    console.log('Adding Latest from DancerGirl...')
    for (const story of latestFromDancerGirl) {
      const result = await client.create(story)
      console.log(`Created latest story: ${result.title}`)
    }

    console.log('✅ All frontend-matching content added successfully!')
  } catch (error) {
    console.error('❌ Error adding content:', error)
  }
}

addFrontendMatchingContent()
