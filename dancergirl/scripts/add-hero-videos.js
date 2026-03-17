const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'f37vktt0', // Your project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to set this
  useCdn: false,
})

const heroVideos = [
  {
    _type: 'heroVideo',
    title: 'MLM',
    slug: { _type: 'slug', current: 'mlm-hero' },
    fallbackTitle: 'MLM Dance Performance',
    videoId: 'ntS0hequ388',
    articleSlug: 'mlm-dance',
    order: 0,
    isActive: true,
    description: 'MLM dance performance featuring dynamic choreography and vibrant energy.',
    tags: ['dance', 'performance', 'mlm', 'choreography'],
    createdAt: new Date().toISOString(),
  },
  {
    _type: 'heroVideo',
    title: 'Tinashe',
    slug: { _type: 'slug', current: 'tinashe-hero' },
    fallbackTitle: 'Tinashe Dance Choreography',
    videoId: '9VP7FtwH9Ng',
    articleSlug: 'tinashe-dance',
    order: 1,
    isActive: true,
    description: 'Tinashe-inspired dance choreography with smooth moves and style.',
    tags: ['dance', 'tinashe', 'choreography', 'style'],
    createdAt: new Date().toISOString(),
  },
  {
    _type: 'heroVideo',
    title: 'Ballet',
    slug: { _type: 'slug', current: 'ballet-hero' },
    fallbackTitle: 'Ballet Dance Performance',
    videoId: 'kTvzU1sGSyA',
    articleSlug: 'ballet-dance',
    order: 2,
    isActive: true,
    description: 'Beautiful ballet dance performance showcasing grace and technique.',
    tags: ['ballet', 'dance', 'performance', 'classical'],
    createdAt: new Date().toISOString(),
  }
]

async function createHeroVideos() {
  try {
    console.log('Creating hero videos...')
    
    for (const heroVideo of heroVideos) {
      const result = await client.create(heroVideo)
      console.log(`✅ Created hero video: ${heroVideo.title} (${result._id})`)
    }
    
    console.log('\n🎉 All hero videos created successfully!')
    console.log('You can now manage these videos in your Sanity Studio.')
    
  } catch (error) {
    console.error('❌ Error creating hero videos:', error.message)
  }
}

createHeroVideos()