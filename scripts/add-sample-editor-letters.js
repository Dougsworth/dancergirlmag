import { createClient } from '@sanity/client';

const config = {
  projectId: 'f37vktt0',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
};

const client = createClient(config);

const sampleEditorLetters = [
  {
    title: "Welcome to Our Dance Community",
    slug: "welcome-to-our-dance-community",
    excerpt: "A warm welcome message from our founder to all the amazing dancers who make our community vibrant and inspiring.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Dear Dance Community,\n\nWelcome to DancerGirl Island Rhythms! I'm thrilled to have you here as part of our growing family of Caribbean dance enthusiasts.\n\nThis platform was born from a deep love for the rhythms, movements, and stories that make Caribbean dance so special. Whether you're a seasoned dancer, just starting your journey, or simply someone who appreciates the beauty of movement, you have a place here.\n\nOur mission is to celebrate and preserve the rich cultural heritage of Caribbean dance while building bridges between communities around the world. Through stories, tutorials, events, and personal connections, we're creating a space where everyone can learn, grow, and be inspired.\n\nI believe that dance has the power to transform lives, heal hearts, and bring people together. Every step, every rhythm, every story shared here contributes to that beautiful transformation.\n\nThank you for being part of this journey. Let's dance together, learn together, and celebrate the incredible art form that connects us all.\n\nWith love and rhythm,\nYour Editor"
          }
        ]
      }
    ],
    publishedAt: "2024-01-15T10:00:00Z",
    featured: true,
    tags: ["welcome", "community", "introduction"],
    seoTitle: "Welcome to Our Dance Community - Editor's Letter",
    seoDescription: "A warm welcome message from our founder to the Caribbean dance community."
  },
  {
    title: "The Power of Caribbean Dance",
    slug: "the-power-of-caribbean-dance",
    excerpt: "Exploring how Caribbean dance forms have influenced global culture and continue to inspire dancers worldwide.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "The Power of Caribbean Dance\n\nCaribbean dance is more than just movement—it's a living history, a celebration of resilience, and a powerful form of cultural expression that has touched every corner of the globe.\n\nFrom the infectious rhythms of soca and dancehall to the graceful movements of traditional folk dances, Caribbean dance forms carry stories of triumph, joy, and community. These dances have traveled far beyond their origins, influencing music videos, fitness classes, and dance styles around the world.\n\nWhat makes Caribbean dance so special is its ability to bring people together. Whether you're in a crowded carnival, a dance class, or watching a performance, there's an undeniable energy that connects everyone in the room.\n\nAs we continue to share these beautiful dance forms, we're not just teaching steps—we're preserving culture, building bridges, and creating spaces where everyone can feel the rhythm in their soul.\n\nLet's keep dancing, keep learning, and keep sharing the incredible power of Caribbean dance with the world.\n\nKeep moving,\nYour Editor"
          }
        ]
      }
    ],
    publishedAt: "2024-02-01T10:00:00Z",
    featured: false,
    tags: ["culture", "influence", "global"],
    seoTitle: "The Power of Caribbean Dance - Editor's Letter",
    seoDescription: "Exploring the global influence and cultural significance of Caribbean dance forms."
  },
  {
    title: "Building Your Dance Confidence",
    slug: "building-your-dance-confidence",
    excerpt: "Tips and encouragement for dancers at every level to build confidence and find their unique style.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Building Your Dance Confidence\n\nEvery dancer, from beginner to professional, has moments of doubt. The truth is, confidence in dance comes from practice, patience, and embracing your unique journey.\n\nHere are a few things I've learned along the way:\n\n1. Start where you are. Every expert was once a beginner.\n2. Practice regularly, even if it's just for 10 minutes a day.\n3. Record yourself dancing and celebrate your progress.\n4. Find a supportive community of dancers.\n5. Remember that there's no 'perfect' way to dance.\n\nYour dance journey is uniquely yours. Don't compare yourself to others—focus on your own growth and celebrate every small victory.\n\nWhether you're learning your first steps or perfecting advanced moves, remember that every dancer brings something special to the floor. Your style, your energy, your story—it all matters.\n\nKeep dancing, keep growing, and most importantly, keep believing in yourself.\n\nYou've got this!\n\nYour Editor"
          }
        ]
      }
    ],
    publishedAt: "2024-02-15T10:00:00Z",
    featured: false,
    tags: ["confidence", "tips", "motivation"],
    seoTitle: "Building Your Dance Confidence - Editor's Letter",
    seoDescription: "Encouragement and tips for dancers to build confidence and find their unique style."
  }
];

async function addSampleEditorLetters() {
  try {
    console.log('Adding sample editor letters...');
    
    // First, get a founder reference
    const founders = await client.fetch('*[_type == "founder"]{_id, name}');
    const founderRef = founders[0]?._id;
    
    if (!founderRef) {
      console.error('No founder found. Please create a founder first in Sanity Studio.');
      return;
    }

    for (const letter of sampleEditorLetters) {
      const doc = {
        _type: 'editorLetter',
        title: letter.title,
        slug: {
          _type: 'slug',
          current: letter.slug
        },
        excerpt: letter.excerpt,
        content: letter.content,
        publishedAt: letter.publishedAt,
        featured: letter.featured,
        author: {
          _type: 'reference',
          _ref: founderRef
        },
        tags: letter.tags,
        seoTitle: letter.seoTitle,
        seoDescription: letter.seoDescription
      };

      const result = await client.create(doc);
      console.log(`Created editor letter: ${letter.title} (${result._id})`);
    }

    console.log('✅ Sample editor letters added successfully!');
  } catch (error) {
    console.error('Error adding sample editor letters:', error);
  }
}

addSampleEditorLetters();
