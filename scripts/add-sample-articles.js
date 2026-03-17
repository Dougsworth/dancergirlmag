import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "f37vktt0",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skR0whoU0xMvpujfTG6E4WoWRIgt8TL0ceTf49GkHkDu99BJrvILK20BzKTtV2fwOUfzSpfTTttsOgybUSaeSpyKKs5udQzeMwgm5JFCi9GGoWmNtZsktLnVn5tAEbKv01yzFF2lTc0yFOJuOfTMvYu4AB5XL2X2Og25hOjgHzpRo7ypsU6V",
  useCdn: false,
});

const sampleArticles = [
  {
    _type: "article",
    title: "The History of Dancehall: From Jamaica to the World",
    slug: {
      _type: "slug",
      current: "history-of-dancehall",
    },
    excerpt:
      "Explore the rich cultural heritage and evolution of dancehall music and dance from its roots in Jamaica to global influence.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dancehall music and dance culture emerged in Jamaica during the late 1970s and early 1980s. It was born from the vibrant streets of Kingston, where sound systems would compete for the loudest and most innovative sound.",
          },
        ],
      },
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-1", // You'll need to upload an actual image
      },
    },
    mainImageAlt: "Dancehall dancers in traditional Jamaican setting",
    publishedAt: "2025-01-20T10:00:00Z",
    author: "Marcus Johnson",
    category: "History",
    readTime: 12,
    featured: true,
  },
  {
    _type: "article",
    title: "Essential Dancehall Moves for Beginners",
    slug: {
      _type: "slug",
      current: "essential-dancehall-moves-beginners",
    },
    excerpt:
      "Master the fundamental dancehall moves that every beginner should know, from the basic bounce to the signature steps.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dancehall dance is characterized by its energetic, rhythmic movements that sync perfectly with the music. For beginners, it's important to start with the basics and build your way up.",
          },
        ],
      },
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-2",
      },
    },
    mainImageAlt: "Dance instructor demonstrating basic dancehall moves",
    publishedAt: "2025-01-18T14:30:00Z",
    author: "Aisha Thompson",
    category: "Tutorial",
    readTime: 8,
    featured: false,
  },
  {
    _type: "article",
    title: "Caribbean Dance Culture: Beyond the Moves",
    slug: {
      _type: "slug",
      current: "caribbean-dance-culture-beyond-moves",
    },
    excerpt:
      "Discover the deeper cultural significance and social impact of Caribbean dance traditions across the islands.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Caribbean dance is more than just movement—it's a form of storytelling, resistance, and celebration that has been passed down through generations.",
          },
        ],
      },
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-3",
      },
    },
    mainImageAlt: "Traditional Caribbean dance performance",
    publishedAt: "2025-01-15T09:15:00Z",
    author: "Dr. Sarah Williams",
    category: "Culture",
    readTime: 15,
    featured: true,
  },
  {
    _type: "article",
    title: "Top 10 Dancehall Artists You Need to Know",
    slug: {
      _type: "slug",
      current: "top-10-dancehall-artists",
    },
    excerpt:
      "From legends to rising stars, meet the artists who are shaping the future of dancehall music and dance.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dancehall music continues to evolve with new artists bringing fresh perspectives while honoring the traditions of the genre.",
          },
        ],
      },
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-4",
      },
    },
    mainImageAlt: "Dancehall artists performing on stage",
    publishedAt: "2025-01-12T16:45:00Z",
    author: "Kevin Rodriguez",
    category: "Interviews",
    readTime: 10,
    featured: false,
  },
  {
    _type: "article",
    title: "Building Your Dancehall Community",
    slug: {
      _type: "slug",
      current: "building-dancehall-community",
    },
    excerpt:
      "How to find and connect with fellow dancehall enthusiasts in your area and build a supportive dance community.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dancehall is inherently social—it's about community, connection, and shared energy. Building your dance community can enhance your experience and growth as a dancer.",
          },
        ],
      },
    ],
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-5",
      },
    },
    mainImageAlt: "Group of dancers in a community setting",
    publishedAt: "2025-01-10T11:20:00Z",
    author: "Jasmine Clarke",
    category: "Community",
    readTime: 6,
    featured: false,
  },
];

async function addSampleArticles() {
  try {
    console.log("🚀 Adding sample articles to Sanity...");

    for (const article of sampleArticles) {
      const result = await client.create(article);
      console.log(`✅ Added article: ${article.title} (ID: ${result._id})`);
    }

    console.log("🎉 All sample articles added successfully!");
  } catch (error) {
    console.error("❌ Error adding articles:", error);
  }
}

addSampleArticles();
