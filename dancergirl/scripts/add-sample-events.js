import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  token: process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

const sampleEvents = [
  {
    _type: 'event',
    title: 'Caribbean Dance Workshop - Soca & Dancehall',
    slug: { current: 'caribbean-dance-workshop-soca-dancehall' },
    startDateTime: '2025-08-15T18:00:00.000Z',
    endDateTime: '2025-08-15T20:00:00.000Z',
    location: {
      name: 'Dance Studio Downtown',
      city: 'Kingston',
      country: 'Jamaica',
      address: '123 Dance Street, Kingston',
      isOnline: false
    },
    price: 25,
    registrationRequired: true,
    excerpt: 'Learn the hottest moves in Soca and Dancehall with professional instructors from Trinidad and Jamaica.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join us for an exciting Caribbean dance workshop featuring the hottest moves in Soca and Dancehall. Our professional instructors will guide you through authentic steps and rhythms.'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Virtual Calypso Dance Class',
    slug: { current: 'virtual-calypso-dance-class' },
    startDateTime: '2025-08-20T19:00:00.000Z',
    endDateTime: '2025-08-20T20:30:00.000Z',
    location: {
      isOnline: true,
      meetingUrl: 'https://zoom.us/j/123456789'
    },
    price: 0,
    registrationRequired: true,
    excerpt: 'Free online class teaching traditional Calypso dance moves. Perfect for beginners!',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Learn traditional Calypso dance moves from the comfort of your home. This free online class is perfect for beginners and intermediate dancers alike.'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Reggae Dance Competition',
    slug: { current: 'reggae-dance-competition' },
    startDateTime: '2025-08-25T14:00:00.000Z',
    endDateTime: '2025-08-25T18:00:00.000Z',
    location: {
      name: 'Cultural Center',
      city: 'Bridgetown',
      country: 'Barbados',
      address: 'Cultural Plaza, Bridgetown',
      isOnline: false
    },
    price: 15,
    registrationRequired: true,
    excerpt: 'Annual reggae dance competition with prizes for winners in different categories.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join our annual reggae dance competition! Categories include Solo, Couples, and Group performances. Cash prizes for winners!'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Bachata Caribbean Fusion Workshop',
    slug: { current: 'bachata-caribbean-fusion-workshop' },
    startDateTime: '2025-08-30T16:00:00.000Z',
    endDateTime: '2025-08-30T18:30:00.000Z',
    location: {
      name: 'Island Dance Academy',
      city: 'Santo Domingo',
      country: 'Dominican Republic',
      address: '456 Merengue Ave, Santo Domingo',
      isOnline: false
    },
    price: 30,
    registrationRequired: true,
    excerpt: 'Experience the fusion of traditional Bachata with modern Caribbean rhythms.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Discover the beautiful fusion of traditional Bachata with modern Caribbean influences. Perfect for dancers looking to expand their repertoire.'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Salsa & Caribbean Night',
    slug: { current: 'salsa-caribbean-night' },
    startDateTime: '2025-09-05T20:00:00.000Z',
    endDateTime: '2025-09-05T23:00:00.000Z',
    location: {
      name: 'Tropical Lounge',
      city: 'San Juan',
      country: 'Puerto Rico',
      address: '789 Salsa Street, San Juan',
      isOnline: false
    },
    price: 20,
    registrationRequired: false,
    excerpt: 'Social dancing event with live DJ playing the best Salsa and Caribbean hits.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join us for a night of social dancing! Live DJ spinning the best Salsa and Caribbean hits. All skill levels welcome.'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Traditional Folk Dance Performance',
    slug: { current: 'traditional-folk-dance-performance' },
    startDateTime: '2025-09-12T19:30:00.000Z',
    endDateTime: '2025-09-12T21:00:00.000Z',
    location: {
      name: 'National Theatre',
      city: 'Port of Spain',
      country: 'Trinidad and Tobago',
      address: 'Queen Street, Port of Spain',
      isOnline: false
    },
    price: 35,
    registrationRequired: false,
    excerpt: 'Watch authentic Caribbean folk dances performed by the National Dance Company.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience the rich cultural heritage of the Caribbean through traditional folk dances performed by the renowned National Dance Company.'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Kids Caribbean Dance Camp',
    slug: { current: 'kids-caribbean-dance-camp' },
    startDateTime: '2025-09-18T10:00:00.000Z',
    endDateTime: '2025-09-18T15:00:00.000Z',
    location: {
      name: 'Youth Center',
      city: 'Nassau',
      country: 'Bahamas',
      address: '321 Youth Plaza, Nassau',
      isOnline: false
    },
    price: 40,
    registrationRequired: true,
    excerpt: 'Fun-filled day camp introducing children ages 8-14 to Caribbean dance styles.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A fun-filled day camp designed to introduce children to the joy of Caribbean dance. Ages 8-14 welcome. Includes lunch and activities.'
          }
        ]
      }
    ]
  },
  {
    _type: 'event',
    title: 'Online Dancehall Masterclass',
    slug: { current: 'online-dancehall-masterclass' },
    startDateTime: '2025-09-22T17:00:00.000Z',
    endDateTime: '2025-09-22T18:30:00.000Z',
    location: {
      isOnline: true,
      meetingUrl: 'https://zoom.us/j/987654321'
    },
    price: 18,
    registrationRequired: true,
    excerpt: 'Advanced Dancehall techniques taught by international choreographer.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Take your Dancehall skills to the next level with this advanced masterclass featuring international choreographer and techniques used by professional dancers.'
          }
        ]
      }
    ]
  }
];

async function addSampleEvents() {
  try {
    console.log('Adding sample events to Sanity...');
    
    for (const event of sampleEvents) {
      try {
        const result = await client.create(event);
        console.log(`✅ Added event: ${event.title}`);
      } catch (error) {
        console.error(`❌ Error adding event "${event.title}":`, error.message);
      }
    }
    
    console.log('\n🎉 Sample events added successfully!');
    console.log('You can now view them in your Sanity Studio and on the events page.');
    
  } catch (error) {
    console.error('Failed to add sample events:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addSampleEvents();
}

export { addSampleEvents, sampleEvents };