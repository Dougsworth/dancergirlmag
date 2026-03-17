import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'f37vktt0',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_TOKEN,
  useCdn: false,
});

async function addPodcastAds() {
  try {
    console.log('🎧 Adding Podcast Ads data...');

    const podcastAds = [
      {
        _type: 'podcastAd',
        _id: 'podcast-ad-jamaican-girl-big-world',
        title: {
          en: 'Jamaican Girl, Big World',
          es: 'Chica Jamaicana, Mundo Grande'
        },
        slug: {
          _type: 'slug',
          current: 'jamaican-girl-big-world'
        },
        description: {
          en: 'Join us as we explore Caribbean culture, dance, and the stories that make our community vibrant. From traditional movements to modern fusion, discover the rhythm of the islands.',
          es: 'Únete a nosotros mientras exploramos la cultura caribeña, la danza y las historias que hacen vibrante nuestra comunidad.'
        },
        platforms: [
          {
            name: 'goodpods',
            url: 'https://goodpods.com/podcasts/north-shore-tv-329194/jamaican-girl-big-world-episode-1-introducing-me-48285534',
            displayName: 'Listen on Goodpods'
          },
          {
            name: 'spotify',
            url: 'https://open.spotify.com/show/your-podcast-id',
            displayName: 'Listen on Spotify'
          },
          {
            name: 'apple',
            url: 'https://podcasts.apple.com/podcast/your-podcast-id',
            displayName: 'Listen on Apple Podcasts'
          },
          {
            name: 'youtube',
            url: 'https://youtube.com/@your-channel',
            displayName: 'Watch on YouTube'
          }
        ],
        ctaText: {
          en: 'Listen Now',
          es: 'Escuchar Ahora'
        },
        tagline: {
          en: 'Our Podcast',
          es: 'Nuestro Podcast'
        },
        displayLocation: ['home', 'stories', 'events'],
        style: 'card',
        backgroundColor: '#FF6B6B',
        featuredEpisode: {
          title: 'Introducing Me - The Journey Begins',
          number: 1,
          description: 'Get to know the story behind DancerGirl and the passion that drives Caribbean dance culture worldwide.',
          url: 'https://goodpods.com/podcasts/north-shore-tv-329194/jamaican-girl-big-world-episode-1-introducing-me-48285534'
        },
        isActive: true,
        priority: 100,
        startDate: '2024-01-01T00:00:00Z'
      },
      {
        _type: 'podcastAd',
        _id: 'podcast-ad-dance-culture-spotlight',
        title: {
          en: 'Dance Culture Spotlight',
          es: 'Enfoque de Cultura de Danza'
        },
        slug: {
          _type: 'slug',
          current: 'dance-culture-spotlight'
        },
        description: {
          en: 'Weekly conversations with Caribbean dance artists, choreographers, and cultural ambassadors sharing their stories and insights.',
          es: 'Conversaciones semanales con artistas de danza caribeña, coreógrafos y embajadores culturales.'
        },
        platforms: [
          {
            name: 'goodpods',
            url: 'https://goodpods.com/podcasts/dance-culture-spotlight',
            displayName: 'Listen on Goodpods'
          }
        ],
        ctaText: {
          en: 'Explore Episodes',
          es: 'Explorar Episodios'
        },
        tagline: {
          en: 'Weekly Spotlight',
          es: 'Enfoque Semanal'
        },
        displayLocation: ['sidebar', 'footer'],
        style: 'banner',
        backgroundColor: '#4ECDC4',
        isActive: true,
        priority: 50,
        startDate: '2024-01-01T00:00:00Z'
      }
    ];

    console.log('📝 Creating podcast ads...');
    for (const ad of podcastAds) {
      try {
        await client.createOrReplace(ad);
        console.log(`✅ Created/updated podcast ad: ${ad.title.en}`);
      } catch (error) {
        console.error(`❌ Error creating podcast ad ${ad.title.en}:`, error.message);
      }
    }

    console.log('\n🎉 Successfully added Podcast Ads data!');
    console.log('🌐 Your podcast ads will now appear on the frontend');
    console.log('\n📋 Next Steps:');
    console.log('1. Add cover images to the podcast ads in Sanity Studio');
    console.log('2. Update platform URLs with real links');
    console.log('3. Configure display locations as needed');
    console.log('4. Add more podcast ads or episodes');

  } catch (error) {
    console.error('❌ Error adding podcast ads:', error);
  }
}

// Run the script
addPodcastAds();