import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Custom video data - modify these to add your own videos
const customVideos = [
  {
    title: "DancerGirl Island Rhythms - Welcome to Our Community",
    description: "Welcome to DancerGirl Island Rhythms! Learn about our mission to celebrate Caribbean dance culture and connect dancers worldwide.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with your actual video URL
    duration: 180, // 3 minutes in seconds
    featured: true,
    tags: ["welcome", "community", "caribbean", "dance"],
    publishedAt: "2024-01-20T10:00:00Z"
  },
  {
    title: "Soca Dance Basics - Step by Step Tutorial",
    description: "Master the fundamentals of soca dance with this comprehensive tutorial. Perfect for beginners and intermediate dancers.",
    videoUrl: "https://www.youtube.com/watch?v=example1", // Replace with your actual video URL
    duration: 600, // 10 minutes in seconds
    featured: false,
    tags: ["soca", "tutorial", "beginner", "basics"],
    publishedAt: "2024-01-18T14:30:00Z"
  },
  {
    title: "Caribbean Dancehall Moves - Advanced Techniques",
    description: "Take your dancehall skills to the next level with these advanced moves and techniques from the Caribbean.",
    videoUrl: "https://www.youtube.com/watch?v=example2", // Replace with your actual video URL
    duration: 900, // 15 minutes in seconds
    featured: false,
    tags: ["dancehall", "advanced", "caribbean", "techniques"],
    publishedAt: "2024-01-16T16:45:00Z"
  },
  {
    title: "Afro-Caribbean Dance Workout - Full Body Cardio",
    description: "Get your heart pumping with this energetic Afro-Caribbean dance workout. Perfect for fitness and dance lovers.",
    videoUrl: "https://www.youtube.com/watch?v=example3", // Replace with your actual video URL
    duration: 1200, // 20 minutes in seconds
    featured: false,
    tags: ["workout", "cardio", "afro-caribbean", "fitness"],
    publishedAt: "2024-01-14T09:15:00Z"
  },
  {
    title: "Traditional Caribbean Folk Dance Performance",
    description: "Experience the rich cultural heritage of Caribbean folk dance through this beautiful performance.",
    videoUrl: "https://www.youtube.com/watch?v=example4", // Replace with your actual video URL
    duration: 480, // 8 minutes in seconds
    featured: false,
    tags: ["folk", "traditional", "cultural", "performance"],
    publishedAt: "2024-01-12T11:20:00Z"
  }
];

async function addCustomVideos() {
  try {
    console.log('🚀 Adding custom videos to Sanity...');
    
    for (const video of customVideos) {
      const videoDoc = {
        _type: 'featuredVideo',
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        duration: video.duration,
        featured: video.featured,
        tags: video.tags,
        publishedAt: video.publishedAt
      };
      
      const result = await client.create(videoDoc);
      console.log(`✅ Added video: ${video.title} (ID: ${result._id})`);
    }
    
    console.log('🎉 Successfully added all custom videos!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to "🎥 Media" → "Featured Videos"');
    console.log('3. You should see your custom videos listed');
    console.log('4. Visit your website\'s Watch page to see them in action!');
    console.log('\n💡 To add more videos:');
    console.log('1. Edit the customVideos array in this script');
    console.log('2. Replace the videoUrl with your actual YouTube/Vimeo URLs');
    console.log('3. Update titles, descriptions, and tags as needed');
    console.log('4. Run this script again');
    
  } catch (error) {
    console.error('❌ Error adding custom videos:', error);
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
  console.log('5. Add it to your .env file: export SANITY_TOKEN="your-token-here"');
  console.log('6. Source the .env file: source .env');
  console.log('7. Then run this script again');
  process.exit(1);
}

addCustomVideos(); 