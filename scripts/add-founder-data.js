import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const founderData = {
  _type: 'founder',
  name: {
    _type: 'internationalizedString',
    en: 'Shanice Neita',
    es: 'Shanice Neita'
  },
  title: {
    _type: 'internationalizedString',
    en: 'Founder & Editor-in-Chief',
    es: 'Fundadora y Editora en Jefe'
  },
  bio: {
    _type: 'internationalizedBlockContent',
    en: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Shanice Neita is the visionary founder of DancerGirl Island Rhythms, a passionate advocate for Caribbean dance culture and a dedicated dance educator. With over a decade of experience in the dance industry, Shanice has dedicated her career to celebrating and preserving the rich cultural heritage of Caribbean movement.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Born and raised in the Caribbean, Shanice discovered her love for dance at an early age. Her journey began with traditional Caribbean folk dances and evolved to encompass contemporary styles, creating a unique fusion that honors both tradition and innovation.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Through DancerGirl, Shanice has created a platform that not only showcases the incredible talent of Caribbean dancers but also educates audiences about the cultural significance and historical roots of Caribbean dance forms.'
          }
        ]
      }
    ],
    es: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Shanice Neita es la visionaria fundadora de DancerGirl Island Rhythms, una apasionada defensora de la cultura de danza caribeña y una dedicada educadora de danza. Con más de una década de experiencia en la industria de la danza, Shanice ha dedicado su carrera a celebrar y preservar el rico patrimonio cultural del movimiento caribeño.'
          }
        ]
      }
    ]
  },
  quote: {
    _type: 'internationalizedText',
    en: 'Dance is not just movement—it\'s the heartbeat of our culture, the rhythm of our history, and the voice of our future. Every step tells a story, every beat connects us to our ancestors.',
    es: 'La danza no es solo movimiento—es el latido de nuestra cultura, el ritmo de nuestra historia y la voz de nuestro futuro. Cada paso cuenta una historia, cada ritmo nos conecta con nuestros ancestros.'
  },
  achievements: [
    {
      achievement: {
        _type: 'internationalizedString',
        en: 'Founded DancerGirl Island Rhythms',
        es: 'Fundó DancerGirl Island Rhythms'
      },
      year: 2023,
      description: {
        _type: 'internationalizedText',
        en: 'Launched the premier digital platform celebrating Caribbean dance culture',
        es: 'Lanzó la plataforma digital principal que celebra la cultura de danza caribeña'
      }
    },
    {
      achievement: {
        _type: 'internationalizedString',
        en: 'Dance Education Certification',
        es: 'Certificación en Educación de Danza'
      },
      year: 2021,
      description: {
        _type: 'internationalizedText',
        en: 'Completed advanced certification in Caribbean dance education and cultural preservation',
        es: 'Completó certificación avanzada en educación de danza caribeña y preservación cultural'
      }
    },
    {
      achievement: {
        _type: 'internationalizedString',
        en: 'Cultural Ambassador',
        es: 'Embajadora Cultural'
      },
      year: 2020,
      description: {
        _type: 'internationalizedText',
        en: 'Recognized for contributions to Caribbean dance culture preservation and promotion',
        es: 'Reconocida por sus contribuciones a la preservación y promoción de la cultura de danza caribeña'
      }
    }
  ],
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://instagram.com/dancergirlmagazine'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/shaniceneita'
    },
    {
      platform: 'email',
      url: 'mailto:shanice@dancergirl.com'
    }
  ],
  education: [
    {
      institution: {
        _type: 'internationalizedString',
        en: 'Caribbean Dance Institute',
        es: 'Instituto de Danza Caribeña'
      },
      degree: {
        _type: 'internationalizedString',
        en: 'Master of Dance Studies',
        es: 'Maestría en Estudios de Danza'
      },
      year: '2019-2021',
      description: {
        _type: 'internationalizedText',
        en: 'Specialized in Caribbean dance history and cultural preservation',
        es: 'Especializada en historia de la danza caribeña y preservación cultural'
      }
    },
    {
      institution: {
        _type: 'internationalizedString',
        en: 'University of the West Indies',
        es: 'Universidad de las Indias Occidentales'
      },
      degree: {
        _type: 'internationalizedString',
        en: 'Bachelor of Arts in Cultural Studies',
        es: 'Licenciatura en Artes en Estudios Culturales'
      },
      year: '2015-2019',
      description: {
        _type: 'internationalizedText',
        en: 'Focused on Caribbean cultural heritage and performing arts',
        es: 'Enfocado en el patrimonio cultural caribeño y las artes escénicas'
      }
    }
  ],
  vision: {
    _type: 'internationalizedBlockContent',
    en: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'My vision for DancerGirl is to create a global platform that celebrates the diversity and richness of Caribbean dance culture. I believe that dance is a powerful medium for storytelling, cultural preservation, and community building.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Through DancerGirl, we\'re not just showcasing dance—we\'re preserving history, celebrating identity, and building bridges between cultures. Every dancer has a story, every movement has meaning, and every rhythm connects us to our roots.'
          }
        ]
      }
    ],
    es: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Mi visión para DancerGirl es crear una plataforma global que celebre la diversidad y riqueza de la cultura de danza caribeña. Creo que la danza es un medio poderoso para contar historias, preservar la cultura y construir comunidad.'
          }
        ]
      }
    ]
  },
  email: 'shanice@dancergirl.com',
  isActive: true
};

async function addFounderData() {
  try {
    console.log('🚀 Adding Shanice Neita founder data to Sanity...');
    
    // Check if founder already exists
    const existingFounder = await client.fetch('*[_type == "founder"][0]');
    
    if (existingFounder) {
      console.log('⚠️  Founder data already exists. Updating...');
      const result = await client.createOrReplace({
        ...founderData,
        _id: existingFounder._id
      });
      console.log(`✅ Updated founder data (ID: ${result._id})`);
    } else {
      const result = await client.create(founderData);
      console.log(`✅ Added founder data (ID: ${result._id})`);
    }
    
    console.log('🎉 Successfully added/updated founder data!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to "👥 People" → "Founder"');
    console.log('3. You should see Shanice Neita\'s profile');
    console.log('4. Upload a profile image for Shanice');
    console.log('5. Visit your website\'s About page to see the founder section!');
    
  } catch (error) {
    console.error('❌ Error adding founder data:', error);
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

addFounderData(); 