import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to set this environment variable
  useCdn: false,
});

const sampleVideos = [
  {
    _type: 'featuredVideo',
    title: "SOCA DANCE TUTORIAL | Easy Steps for Beginners",
    description: "Learn the basics of soca dance with this beginner-friendly tutorial. Perfect for anyone wanting to get started with Caribbean dance styles.",
    videoUrl: "https://www.youtube.com/watch?v=SJWdnCkRqqg",
    duration: 754, // 12:34 in seconds
    featured: true,
    difficulty: 'beginner',
    danceStyle: 'traditional',
    tags: ["soca", "beginner", "tutorial", "caribbean"],
    publishedAt: "2024-01-15T10:00:00Z"
  },
  {
    _type: 'video',
    title: "Caribbean Dancehall Moves | Step by Step Tutorial",
    description: "Master essential dancehall moves with this comprehensive tutorial. Learn the techniques that make Caribbean dance so vibrant and energetic.",
    videoUrl: "https://www.youtube.com/watch?v=Wx7iNWGJI0g",
    duration: 525, // 8:45 in seconds
    featured: false,
    difficulty: 'intermediate',
    danceStyle: 'dancehall',
    tags: ["dancehall", "caribbean", "tutorial", "intermediate"],
    publishedAt: "2024-01-10T14:30:00Z"
  },
  {
    _type: 'video',
    title: "Afro-Caribbean Dance Workout | Full Body Cardio",
    description: "Get your heart pumping with this energetic Afro-Caribbean dance workout. Perfect for fitness enthusiasts who love to dance.",
    videoUrl: "https://www.youtube.com/watch?v=t5usj5NNw5Q",
    duration: 1455, // 24:15 in seconds
    featured: false,
    difficulty: 'intermediate',
    danceStyle: 'afrobeats',
    tags: ["workout", "cardio", "afro-caribbean", "fitness"],
    publishedAt: "2024-01-08T09:15:00Z"
  },
  {
    _type: 'video',
    title: "Traditional Caribbean Folk Dance Performance",
    description: "Experience the rich cultural heritage of Caribbean folk dance through this beautiful performance showcasing traditional movements and rhythms.",
    videoUrl: "https://www.youtube.com/watch?v=4Hn2F7Cqh8Q",
    duration: 922, // 15:22 in seconds
    featured: false,
    danceStyle: 'traditional',
    tags: ["folk", "traditional", "cultural", "performance"],
    publishedAt: "2024-01-05T16:45:00Z"
  },
  {
    _type: 'video',
    title: "Carnival Dance Moves | Trinidad & Tobago Style",
    description: "Learn authentic carnival dance moves from Trinidad & Tobago. Get ready to move your body to the infectious rhythms of carnival.",
    videoUrl: "https://www.youtube.com/watch?v=bKtx9GXO5ac",
    duration: 390, // 6:30 in seconds
    featured: false,
    difficulty: 'beginner',
    danceStyle: 'traditional',
    tags: ["carnival", "trinidad", "tobago", "festival"],
    publishedAt: "2024-01-03T11:20:00Z"
  },
  {
    _type: 'video',
    title: "Salsa & Merengue Dance Lesson | Caribbean Style",
    description: "Discover the Latin-Caribbean connection with this salsa and merengue dance lesson. Perfect for couples and solo dancers alike.",
    videoUrl: "https://www.youtube.com/watch?v=hRJVVnr0kyk",
    duration: 1125, // 18:45 in seconds
    featured: false,
    difficulty: 'intermediate',
    danceStyle: 'fusion',
    tags: ["salsa", "merengue", "latin", "caribbean"],
    publishedAt: "2024-01-01T13:00:00Z"
  }
];

async function addSampleVideos() {
  try {
    console.log('🚀 Adding sample videos to Sanity...');
    
    for (const video of sampleVideos) {
      const videoDoc = {
        _type: video._type,
        title: video.title,
        slug: {
          _type: 'slug',
          current: video.title.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .trim()
        },
        description: video.description,
        videoUrl: video.videoUrl,
        duration: video.duration,
        featured: video.featured,
        difficulty: video.difficulty,
        danceStyle: video.danceStyle,
        tags: video.tags,
        publishedAt: video.publishedAt
      };
      
      const result = await client.create(videoDoc);
      console.log(`✅ Added video: ${video.title} (ID: ${result._id})`);
    }
    
    console.log('🎉 Successfully added all sample videos!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to "🎥 Media" → "Featured Videos"');
    console.log('3. You should see the sample videos listed');
    console.log('4. Visit your website\'s Watch page to see them in action!');
    
  } catch (error) {
    console.error('❌ Error adding sample videos:', error);
  }
}

// Check if SANITY_TOKEN is set
if (!process.env.SANITY_TOKEN) {
  console.error('❌ Error: SANITY_TOKEN environment variable is not set');
  console.log('\n📝 To set up your token:');
  console.log('1. Go to https://www.sanity.io/manage');
  console.log('2. Select your project');
  console.log('3. Go to API tab');
  console.log('4. Create a new token with "Editor" permissions');
  console.log('5. Run: export SANITY_TOKEN="your-token-here"');
  console.log('6. Then run this script again');
  process.exit(1);
}

addSampleVideos(); 