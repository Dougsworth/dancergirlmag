// importDancerGirlContent.js
// Maps DancerGirl content to your existing Sanity schemas

import sanityClient from '@sanity/client'
import { nanoid } from 'nanoid'

const client = sanityClient({
  projectId: 'f37vktt0',
  dataset: 'production',
  token: 'skUB5lTMW6Jwrp8f7zBAOtcfJh7aDaHZdqt5782gba8hfx7wLsNJDu8mCB1QeJ29DGnVFzGWQ3XrcVvF6y4ohlBFkkfqFJtg6XzScF3t2PA6j5BrP5cLBRc6v56dyxu4VtA2xEGi1x1aYPHmyBsDODk6vlqrrc6ctACJyXABNMdKSbhal8hn',
  apiVersion: '2024-01-01',
  useCdn: false
})

// Helper to create portable text blocks
function textToBlocks(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return paragraphs.map(paragraph => {
    const isPullQuote = paragraph.includes('(pull out quote)')
    
    return {
      _type: 'block',
      _key: nanoid(),
      style: isPullQuote ? 'blockquote' : 'normal',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: nanoid(),
        text: paragraph.replace('(pull out quote)', '').trim(),
        marks: []
      }]
    }
  })
}

// Helper for internationalized content
function createInternationalizedText(enText, esText = null) {
  return {
    en: enText,
    es: esText || enText
  }
}

function createInternationalizedBlocks(enText, esText = null) {
  return {
    en: textToBlocks(enText),
    es: esText ? textToBlocks(esText) : textToBlocks(enText)
  }
}

// Main content organized for import
const contentToImport = {
  // AUTHORS - Match author schema exactly
  authors: [
    {
      _id: 'author-shanice-neita',
      _type: 'author',
      name: 'Shanice Neita',
      slug: { _type: 'slug', current: 'shanice-neita' },
      role: 'Editor in Chief',
      bio: textToBlocks('Editor in Chief of DancerGirl Magazine. A passionate advocate for Caribbean dance, bringing over 11 years of dance journalism experience to celebrate and preserve Caribbean dance culture.'),
      featured: true,
      social: {
        instagram: 'https://instagram.com/dancergirlmag',
        website: 'https://dancergirlmagazine.com'
      }
    }
  ],

  // CATEGORIES - Match category schema
  categories: [
    {
      _id: 'cat-choreographers-corner',
      _type: 'category',
      title: createInternationalizedText("Choreographer's Corner"),
      slug: { _type: 'slug', current: 'choreographers-corner' },
      description: createInternationalizedText('Spotlighting the creative minds behind the movement')
    },
    {
      _id: 'cat-features',
      _type: 'category',
      title: createInternationalizedText('Features'),
      slug: { _type: 'slug', current: 'features' },
      description: createInternationalizedText('In-depth stories about dancers and their journeys')
    },
    {
      _id: 'cat-money-moves',
      _type: 'category',
      title: createInternationalizedText('Money Moves'),
      slug: { _type: 'slug', current: 'money-moves' },
      description: createInternationalizedText('Business and financial advice for dancers')
    },
    {
      _id: 'cat-dancer-speak-up',
      _type: 'category',
      title: createInternationalizedText('Dancer: Speak Up!'),
      slug: { _type: 'slug', current: 'dancer-speak-up' },
      description: createInternationalizedText('Interviews and conversations with dance professionals')
    }
  ],

  // ARTISTS - Match artist schema with internationalized fields
  artists: [
    {
      _id: 'artist-emiah-fleming',
      _type: 'artist',
      name: createInternationalizedText('Emiah Fleming'),
      slug: { _type: 'slug', current: 'emiah-fleming' },
      bio: createInternationalizedBlocks('Trinidad-based dancer, choreographer, and educator who overcame a slipped disk to build an international dance career. Known for her work in contemporary dance and Christian dance ministry.'),
      socialLinks: [
        {
          platform: 'instagram',
          url: 'https://instagram.com/emiahfleming'
        }
      ],
      isFeatured: true
    },
    {
      _id: 'artist-daneele-dixon',
      _type: 'artist',
      name: createInternationalizedText('Daneele Dixon'),
      slug: { _type: 'slug', current: 'daneele-dixon' },
      bio: createInternationalizedBlocks('Commercial dancer and content creator known for her versatility across ballet, tap, modern, contemporary, ballroom, hip-hop, and dancehall. A passionate advocate for fair compensation in the dance industry.'),
      socialLinks: [
        {
          platform: 'instagram',
          url: 'https://instagram.com/daneele_dixon'
        }
      ],
      isFeatured: true
    },
    {
      _id: 'artist-neila-ebanks',
      _type: 'artist',
      name: createInternationalizedText('Neila Ebanks'),
      slug: { _type: 'slug', current: 'neila-ebanks' },
      bio: createInternationalizedBlocks('Dance advocate and cultural organizer focused on creating sustainable ecosystems for Caribbean dance. Known for her work in community building and cultural transformation through movement.'),
      isFeatured: true
    },
    {
      _id: 'artist-sherona-mcallister',
      _type: 'artist',
      name: createInternationalizedText('Sherona McAllister'),
      slug: { _type: 'slug', current: 'sherona-mcallister' },
      bio: createInternationalizedBlocks('Jamaican dancer and choreographer, founder of Ballet Bloom. Dedicated to making ballet accessible to all Jamaicans and preserving Caribbean dance traditions.'),
      isFeatured: true
    },
    {
      _id: 'artist-joelle-flimn',
      _type: 'artist',
      name: createInternationalizedText('Joelle Flimn'),
      slug: { _type: 'slug', current: 'joelle-flimn' },
      bio: createInternationalizedBlocks('Young, passionate artist born and raised in Kingston, Jamaica. Devoted to dance, singing, and acting with nearly 20 years of experience in classical, modern, contemporary, folk, and jazz styles.'),
      isFeatured: true
    }
  ],

  // CHOREOGRAPHERS - Match choreographer schema
  choreographers: [
    {
      _id: 'choreo-arnella-bailey',
      _type: 'choreographer',
      name: 'Arnella Bailey Britton',
      slug: { _type: 'slug', current: 'arnella-bailey-britton' },
      bio: 'Final year student at School of Dance, EMCVPA, known for exploring workplace dynamics through contemporary movement.',
      specialties: ['Contemporary', 'Modern'],
      featuredWork: [
        {
          title: 'Cubicle Tether',
          description: 'A contemporary piece exploring the robotic routines of office life and questioning whether we are all just tethered to a cubicle.',
          year: 2024
        }
      ],
      featured: true,
      publishedAt: '2025-09-01T00:00:00Z'
    },
    {
      _id: 'choreo-renee-mcdonald',
      _type: 'choreographer',
      name: 'Renee McDonald',
      slug: { _type: 'slug', current: 'renee-mcdonald' },
      bio: 'Full-time attorney and internationally acclaimed choreographer who has created works for L\'Acadco, CDT, NDTC, and Ailey II.',
      specialties: ['Contemporary', 'Modern', 'Theatre'],
      featuredWork: [
        {
          title: 'Divulgence',
          description: 'A powerful contemporary work exploring personal revelations and truth.',
          year: 2023
        },
        {
          title: 'Spectrum',
          description: 'An exploration of human emotions through movement.',
          year: 2024
        }
      ],
      featured: true,
      publishedAt: '2025-09-01T00:00:00Z'
    }
  ],

  // FEATURED STORIES - Match featuredStory schema
  featuredStories: [
    {
      _id: 'featured-emiah-fleming',
      _type: 'featuredStory',
      title: "If Faith is the Evidence of Things not Seen, where did Emiah's Dreams go?",
      slug: { _type: 'slug', current: 'emiah-fleming-faith-dreams' },
      excerpt: "From gymnastics injury at age nine to international dance stages, Emiah Fleming's journey proves that sometimes our biggest setbacks lead to our greatest breakthroughs.",
      publishedAt: '2025-09-01T00:00:00Z',
      featured: true,
      order: 1,
      body: textToBlocks(`"The truth is, I didn't like dance. I was forced to dance because at the Sierra Lambert School of Dance, where I was enrolled in gymnastics, all of us had to take dance classes as well," Emiah revealed on our Zoom call. Her in Trinidad and I, here in Jamaica.

That revelation shocked me after watching Emiah blossom during those short few months of her being at Edna Manley, School of Dance in her first year, and I in my second. I watched this girl who didn't even like dance become one of the most passionate dancers I knew. So passionate that she flew from Trinidad to Jamaica, week after week, to train at Edna Manley. So passionate that she started her own dance company, SEED, and began teaching others. So passionate that she placed second out of 57 countries at the World Championship of Performing Arts in 2019.

But life has a way of testing our dreams. "I wanted to dance professionally, but I had a slipped disk, so I couldn't continue training how I wanted to," Emiah explains. "I had to stop dancing for a while."

Instead of letting this setback define her, Emiah channeled her love for movement into education and ministry. "I decided to study to become a physical education teacher. But the universe had other plans."

Those plans included acceptance to the prestigious Joffrey Ballet School Summer Intensive and later establishing herself as a sought-after choreographer and educator across the Caribbean. "Now I realize that everything happens for a reason. My injury led me to understand the body differently, which made me a better teacher and choreographer."

Today, Emiah continues to inspire through her work with SEED dance company and her ministry, proving that sometimes our biggest obstacles become our greatest strengths.`)
    },
    {
      _id: 'featured-renee-mcdonald',
      _type: 'featuredStory',
      title: "Renee's Choreographic Pursuit of Drama & Beauty",
      slug: { _type: 'slug', current: 'renee-mcdonald-choreographic-pursuit' },
      excerpt: "Full-time lawyer by day, internationally acclaimed choreographer by night - Renee McDonald navigates dual worlds with grace and grit.",
      publishedAt: '2025-09-01T00:00:00Z',
      featured: true,
      order: 2,
      body: textToBlocks(`Renee McDonald defies easy categorization. By day, she's a full-time attorney navigating the complexities of law. By night and weekend, she's an internationally acclaimed choreographer whose works have graced stages from Kingston to New York.

"People always ask how I balance both worlds," Renee laughs during our conversation. "The truth is, they feed each other. The discipline I learned in law helps me structure my creative process, and the creativity from dance helps me think outside the box in my legal work."

This dual expertise has served her well. Her choreographic works have been performed by L'Acadco, Company Dance Theatre (CDT), the National Dance Theatre Company of Jamaica (NDTC), and even Ailey II in New York.

"Dance is where I find my voice," she reflects. "In the courtroom, I advocate for my clients. On stage, I advocate for stories that need to be told, emotions that need to be expressed."

Her latest work, "Divulgence," explores themes of truth and revelation - fitting for someone who lives between the worlds of legal precision and artistic expression. "Both law and dance are about finding truth," she says. "Just through different languages."`)
    }
  ],

  // ARTICLES - Match article schema with internationalized content
  articles: [
    {
      _id: 'article-cubicle-tether',
      _type: 'article',
      title: createInternationalizedText("Choreographer's Corner: Arnella Bailey Britton's 'Cubicle Tether'"),
      slug: { _type: 'slug', current: 'arnella-bailey-britton-cubicle-tether' },
      author: { _type: 'reference', _ref: 'author-shanice-neita' },
      categories: [{ _type: 'reference', _ref: 'cat-choreographers-corner' }],
      excerpt: createInternationalizedText("Are We All Just Tethered To A Cubicle? Arnella Bailey Britton explores the robotic routines of office life through contemporary dance."),
      publishedAt: '2025-09-01T00:00:00Z',
      featured: true,
      body: createInternationalizedBlocks(`Arnella Bailey Britton had an ingenious idea for her final year show in a body therapist class. One afternoon at the School of Dance, EMCVPA, her lecturer gave the class an assignment to come up with movements based on things done throughout the entire day, so as she came up with movements, she noticed how simple they were, "all of my movements were locomotives," she explained. "Very simple, like walking, lifting an object, or standing. If it wasn't for this assignment, I wouldn't have realized that I am living in a set routine every day. I wondered if it's only happening to me, do other people realize that we're doing the same thing over and over and over?" She continued.

Taking it a step further, she began to identify where else these simplistic routines took place, and it dawned on her that in the office space, people move around in this same robotic sense; sitting, standing, walking, almost under a spell, just doing what they're told until the clock strikes 5. "I started investigating the relationships there. I wanted to focus on the different dynamics in the workplace; that's how I came up with the themes, identifying the routines and the different conflicts that may arise." She told DG. The overarching theme for her research was the influences of art and the impact it has on employees. How little in control they are of their own lives.

I went to watch Arnella prepare for her final showcase. As I stepped into the Bert Rose Studio Theatre to meet her and observe her process, I noticed it was buzzing with energy — loud chatter reverberating off concrete walls, and dancers spilled into the rehearsal space because the School of Dance still lacks a proper lounge. Friends and family linger at the edges, waiting. Centre stage, Arnella is working through the solo with Melissa Thompson. Abby Pitter, Sontee Davis, and Joanna Millwood, the other members of the cast, sit, laugh, and mark the movements with their arms as they watch the rehearsal video, working through the choreography for the whole show.

Oneil Pryce — Dance Lecturer at School of Dance and advisor to Arnella's final year research project, sits in the first row of the first seat in the house, watching, carefully observing the piece as it unfolds, in between moves and directions made under Arnella's choreography, he stops her and questions her decisions, "during the duet—what were we intended to see or feel?" She explains to him the emotional characteristics of each dancer and the theme that is to be displayed in each part.

Between blocking and directing, I steal moments of Arnella's focus to inquire about the work. "What do you hope the audience will take with them after seeing the show?" I question. Arnella urges the audience to look inward and recognize the unseen forces shaping their emotions: "There are people in your life that want to control you," and often, the pain we carry is rooted in that control. She speaks from personal struggle, expressing a deep yearning for freedom: "I don't want to be anybody's puppet…I want to be able to live my life and be free," revealing how the issue can take shape in any area of life: family, school, work.

We're not meant to be tethered to a cubicle occupied in the mundane of simple office tasks, email this, print that, copy those. We are all artists by nature, and the need for expression is rife within us, so if you feel sad, despondent, or frustrated, it's time to find your outlet, as you may be tethered to your very own cubicle.`)
    },
    {
      _id: 'article-money-moves',
      _type: 'article',
      title: createInternationalizedText("Money Moves: 8 Basic Tips for Dancers on Budgeting, Branding, & Getting Gigs"),
      slug: { _type: 'slug', current: 'money-moves-daneele-dixon' },
      author: { _type: 'reference', _ref: 'author-shanice-neita' },
      categories: [{ _type: 'reference', _ref: 'cat-money-moves' }],
      excerpt: createInternationalizedText("Daneele Dixon shares essential tips for building a sustainable dance career in the Caribbean."),
      publishedAt: '2025-09-01T00:00:00Z',
      featured: true,
      body: createInternationalizedBlocks(`Growing up as a ballet dancer, Daneele Dixon began her journey in the structured world of classical dance. But as she evolved as an artist, she realized that technical skill alone wouldn't sustain a career in dance.

"I had to learn the business side the hard way," Daneele admits. "Nobody teaches you how to manage money as a freelance dancer, how to build your brand, or how to value your worth."

Now a successful commercial dancer and content creator, Daneele has learned to navigate the intersection of art and business. Here are her eight essential tips for dancers looking to build sustainable careers:

1. **Budget Like Your Career Depends On It (Because It Does)**
Track every dollar. Create separate accounts for taxes, equipment, and emergency funds. "Dancers often live gig to gig, but you need to think long-term."

2. **Your Brand Is Your Business Card**
Develop a consistent aesthetic across all platforms. "Companies don't want average. They want fresh, new, different. Your brand should communicate what makes you unique."

3. **Know Your Worth (And Don't Accept Less)**
Research industry rates and stick to them. "Exposure doesn't pay bills. Set your rates based on your skill level and the value you bring."

4. **Diversify Your Income Streams**
Don't rely solely on performance gigs. Consider teaching, content creation, brand partnerships, and online courses.

5. **Network Intentionally**
Build genuine relationships, not just transactional connections. "The dance community is small. Your reputation follows you everywhere."

6. **Invest in Your Craft Continuously**
Budget for classes, workshops, and equipment. "Your skill set is your most valuable asset. Keep sharpening it."

7. **Document Everything**
Keep records of all contracts, payments, and expenses. Professional organization separates the amateurs from the professionals.

8. **Plan for the Off-Season**
Caribbean dance work can be seasonal. Save during busy periods and have backup plans for slower months.

"The goal isn't just to survive as a dancer," Daneele concludes. "It's to thrive. And that requires treating your artistry like the business it is."`)
    },
    {
      _id: 'article-neila-ebanks',
      _type: 'article',
      title: createInternationalizedText("Neila Ebanks on Dance as a Voice for Culture and Transformation"),
      slug: { _type: 'slug', current: 'neila-ebanks-dancer-speak-up' },
      author: { _type: 'reference', _ref: 'author-shanice-neita' },
      categories: [{ _type: 'reference', _ref: 'cat-dancer-speak-up' }],
      excerpt: createInternationalizedText("Dance as ecosystem, not industry - Neila Ebanks on advocacy, embodiment, and cultural transformation."),
      publishedAt: '2025-09-01T00:00:00Z',
      featured: true,
      body: createInternationalizedBlocks(`In the Caribbean, where movement has always carried memory, Neila Ebanks understands that dance is much more than entertainment. It's culture, it's resistance, it's life itself.

"We need to stop thinking about dance as an industry and start thinking about it as an ecosystem," Neila says with the passion that has made her a respected voice in Caribbean dance advocacy. "An ecosystem includes everything - the dancers, the audiences, the spaces, the stories, the economics, the spiritual elements."

This holistic approach to dance has shaped Neila's work as both a performer and a cultural organizer. She sees her role not just as a dancer, but as a steward of Caribbean culture in motion.

"When you understand dance as ecosystem, you realize that every part matters. You can't just extract the performance and ignore the cultural context, the community that supports it, or the economic realities that make it sustainable."

This philosophy has led Neila to champion fair compensation for dancers - a conversation that's often uncomfortable but necessary. "You can't go to the supermarket and plié two times and get groceries," she says with characteristic humor. "We need to have honest conversations about value and sustainability."

But for Neila, the work goes beyond economics. It's about cultural preservation and transformation. "Dance carries our stories. It carries our resistance. It carries our joy. When we lose our movement traditions, we lose part of ourselves."

Her advice to young dancers reflects this broader vision: "As a young artist, you're creating culture as you breathe. You don't need permission. But you do need to understand that with that power comes responsibility - to yourself, to your community, and to the culture you're helping to shape."

Through her advocacy work, Neila continues to push for a dance ecosystem that values both tradition and innovation, that supports artists economically and culturally, and that recognizes dance as a vital force for social transformation.`)
    },
    {
      _id: 'article-sherona-mcallister',
      _type: 'article',
      title: createInternationalizedText("Sherona McAllister: Faith, Ballet, and the Bloom of Possibility"),
      slug: { _type: 'slug', current: 'sherona-mcallister-ballet-bloom' },
      author: { _type: 'reference', _ref: 'author-shanice-neita' },
      categories: [{ _type: 'reference', _ref: 'cat-dancer-speak-up' }],
      excerpt: createInternationalizedText("From OBOG to Ballet Bloom - making ballet accessible for all Jamaicans."),
      publishedAt: '2025-09-01T00:00:00Z',
      featured: true,
      body: createInternationalizedBlocks(`For Jamaican dancer and choreographer Sherona McAllister, ballet isn't just an art form - it's a mission field.

"I started Ballet Bloom because I believe ballet should be accessible to every Jamaican child," Sherona explains. "Not just those who can afford expensive private lessons."

Her journey to this mission began with her own dance training and later involvement with OBOG (One Blood One Goal), where she learned about community building and cultural responsibility.

"OBOG taught me that everything we do should serve the community. When I looked at the ballet landscape in Jamaica, I saw a gap - beautiful, talented children who loved movement but couldn't access classical training."

Ballet Bloom fills that gap by providing affordable, high-quality ballet instruction rooted in Jamaican culture. "We don't just teach European ballet techniques," Sherona clarifies. "We teach ballet as it can exist in Jamaica - honoring the classical foundations while celebrating our own cultural movement vocabulary."

The program has grown from a small community class to a recognized institution, with students performing in local productions and some earning scholarships to continue their ballet training abroad.

"Ballet teaches discipline, grace, and storytelling through movement," Sherona reflects. "But it also teaches children that they belong in spaces that might seem exclusive or foreign. That's transformation."

Her work represents a larger conversation happening across the Caribbean about cultural access and representation in classical arts. "We're not trying to replace our traditional dances," she emphasizes. "We're expanding the definition of what Caribbean dance can include."

For Sherona, every plié, every arabesque, every grand jeté is an act of faith - faith that movement can transform lives, communities, and cultures.

"When you see a young Jamaican dancer master a classical ballet variation while maintaining their own cultural identity," she says, "that's when you know the bloom is happening. That's when you see the full possibility of what we can become."`)
    }
  ],

  // DANCER OF THE MONTH - Match dancerOfTheMonth schema
  dancersOfMonth: [
    {
      _id: 'dotm-joelle-flimn-2025-09',
      _type: 'dancerOfTheMonth',
      month: 'September',
      year: 2025,
      artist: { _type: 'reference', _ref: 'artist-joelle-flimn' },
      slug: { _type: 'slug', current: 'joelle-flimn-september-2025' },
      featuredStory: createInternationalizedBlocks(`Joelle is a young, passionate artist born and raised in Kingston, Jamaica, devoted to the dance, singing, and acting fields, with many years of dance experience in classical, modern, contemporary, folk, and jazz styles.

Having been immersed in dance for nearly 20 years, Joelle began her dance journey with the classical dance form of ballet at Vickers Dance Studio, garnering more than 10 distinctions and special awards in the Royal Academy of Dance (RAD) Curriculum.

Her dedication and talent led her to join the National Dance Theatre Company of Jamaica (NDTC), where she is now in her 7th season, and Plié for the Arts Global Collective, where she is in her 6th season.

Throughout her time with these companies, Joelle has had the privilege of performing works by renowned choreographers including Hope Boykin, Troy Powell, and Garfield Lemonius, expanding her artistic range and deepening her connection to Caribbean dance heritage.

As both a performer and emerging choreographer, Joelle represents the new generation of Caribbean dancers who honor tradition while pushing artistic boundaries.`),
      excerpt: createInternationalizedText('Young Jamaican artist with nearly 20 years of dance experience, currently in her 7th season with NDTC and 6th with Plié for the Arts Global Collective.'),
      categories: ['Ballet', 'Contemporary', 'Modern', 'Folk'],
      achievements: [
        {
          achievement: createInternationalizedText('More than 10 distinctions in RAD Curriculum'),
          year: 2020,
          description: createInternationalizedText('Excellence in Royal Academy of Dance classical ballet training')
        },
        {
          achievement: createInternationalizedText('7th season with NDTC'),
          year: 2024,
          description: createInternationalizedText('Continuing member of Jamaica\'s premier dance company')
        }
      ],
      publishedAt: '2025-09-01T00:00:00Z',
      isFeatured: true,
      isActive: true,
      seoTitle: createInternationalizedText('Joelle Flimn - September 2025 Dancer of the Month | DancerGirl'),
      seoDescription: createInternationalizedText('Meet Joelle Flimn, our September 2025 Dancer of the Month. Discover her journey from ballet student to NDTC company member.')
    }
  ],

  // EDITOR LETTERS - Match editorLetter schema
  editorLetters: [
    {
      _id: 'editor-letter-sep-2025',
      _type: 'editorLetter',
      title: createInternationalizedText('New Steps, Old Stories'),
      slug: { _type: 'slug', current: 'editor-letter-september-2025' },
      author: { _type: 'reference', _ref: 'author-shanice-neita' },
      publishedAt: '2025-09-01T00:00:00Z',
      content: createInternationalizedBlocks(`It's my world, and you're all just living in it! ✨

Hello, dance friends, and welcome to DancerGirl Magazine. A dream that's lived in my head for the past 11 years has finally made its debut on your screens — and, one day soon, your coffee tables.

Growing up, I was sure I'd work at a glossy magazine in New York City. I'd walk the halls of Condé Nast, attend Fashion Week, and interview celebrities. But life had different plans. Instead of interviewing A-listers, I found myself drawn to the dancers who move in the shadows of the spotlight - the choreographers crafting stories with their bodies, the teachers preserving culture through movement, the young artists who dance because they must.

This magazine is for them. For us. For everyone who has ever felt the pull of rhythm in their bones and known that movement is more than just steps - it's language, it's healing, it's home.

In this inaugural issue, you'll meet dancers whose stories will inspire you, challenge you, and remind you why we fell in love with movement in the first place. From Emiah Fleming's journey of faith and resilience to Daneele Dixon's practical wisdom about building a sustainable dance career, these are the voices that deserve to be heard.

We're starting small, but we're dreaming big. This is just the beginning of what I hope will become a vital platform for Caribbean dance culture. A place where our stories are centered, our artistry is celebrated, and our community is strengthened.

Thank you for being here at the beginning. Thank you for believing in this vision. And thank you for dancing with us as we take these first steps together.

Let's move.

Shanice Neita
Editor-in-Chief`)
    }
  ],

  // QUOTES - Match quote schema
  quotes: [
    {
      _id: 'quote-danceele-1',
      _type: 'quote',
      text: createInternationalizedText("Companies don't want average. They want fresh, new, different."),
      author: createInternationalizedText('Daneele Dixon'),
      context: createInternationalizedText('On personal branding for dancers'),
      source: { _type: 'reference', _ref: 'article-money-moves' }
    },
    {
      _id: 'quote-danceele-2',
      _type: 'quote',
      text: createInternationalizedText("Exposure doesn't pay bills."),
      author: createInternationalizedText('Daneele Dixon'),
      context: createInternationalizedText('On valuing your work as a dancer'),
      source: { _type: 'reference', _ref: 'article-money-moves' }
    },
    {
      _id: 'quote-neila-1',
      _type: 'quote',
      text: createInternationalizedText("You can't go to the supermarket and plié two times and get groceries."),
      author: createInternationalizedText('Neila Ebanks'),
      context: createInternationalizedText('On the need for fair compensation in dance'),
      source: { _type: 'reference', _ref: 'article-neila-ebanks' }
    },
    {
      _id: 'quote-neila-2',
      _type: 'quote',
      text: createInternationalizedText("As a young artist, you're creating culture as you breathe. You don't need permission."),
      author: createInternationalizedText('Neila Ebanks'),
      context: createInternationalizedText('Advice to young dancers'),
      source: { _type: 'reference', _ref: 'article-neila-ebanks' }
    }
  ]
}

// Import function
async function importContent() {
  console.log('🚀 Starting DancerGirl content import...\n')
  
  const importOrder = [
    'authors',
    'categories', 
    'artists',
    'choreographers',
    'featuredStories',
    'articles',
    'dancersOfMonth',
    'editorLetters',
    'quotes'
  ]
  
  for (const contentType of importOrder) {
    console.log(`📝 Importing ${contentType}...`)
    const items = contentToImport[contentType]
    
    if (!items || items.length === 0) {
      console.log(`  ⚠️  No ${contentType} to import\n`)
      continue
    }
    
    for (const item of items) {
      try {
        await client.createOrReplace(item)
        console.log(`  ✅ ${item.name || item.title?.en || item.title || item._id}`)
      } catch (error) {
        console.error(`  ❌ Failed: ${item.name || item.title?.en || item.title || item._id}`)
        console.error(`     Error: ${error.message}`)
      }
    }
    console.log('')
  }
  
  console.log('✨ Import complete!')
  console.log('🌐 Visit your Sanity Studio to see the imported content')
  console.log('📱 Content should now appear on your website')
}

// Run the import
importContent().catch(console.error)

// To run this script:
// 1. npm install @sanity/client nanoid
// 2. Make sure VITE_SANITY_TOKEN is set in your .env file
// 3. node scripts/importDancerGirlContent.js