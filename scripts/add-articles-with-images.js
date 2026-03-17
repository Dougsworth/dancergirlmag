import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: "f37vktt0",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skTR7tkD0E2Tb4f6ARAe3TeE2wz0W03hCnsXeEbpAyiYBvxnW62O1nYvCJ439rLLzaBaIMr65PB0xqfOd0Hm4CF9odVV6x1FjfCYm5lyJIQQczeOSXMRquxEjlVLE1g1vdWvLtqBubI5mjPchy7L8G2AmwLO5NuenUFxlCNSc63lz4sccI8r",
  useCdn: false,
});

// Sample image URLs (we'll use placeholder images)
const imageUrls = [
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
];

async function uploadImage(imageUrl, filename) {
  try {
    console.log(`📤 Uploading image: ${filename}`);

    // Download the image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    // Upload to Sanity
    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename: filename,
      contentType: "image/jpeg",
    });

    console.log(`✅ Image uploaded: ${filename} (ID: ${asset._id})`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading image ${filename}:`, error);
    return null;
  }
}

const articles = [
  {
    title: "The History of Dancehall in Jamaica",
    slug: { current: "history-dancehall-jamaica" },
    excerpt:
      "Explore the roots of dancehall music and dance culture in Jamaica, from its beginnings to modern influence.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Dancehall music and dance culture emerged in Jamaica during the late 1970s and early 1980s. This vibrant cultural movement was born in the dance halls of Kingston, where DJs would play reggae records and MCs would toast over the rhythms.",
          },
        ],
        style: "normal",
      },
    ],
    publishedAt: new Date("2024-01-15"),
    readTime: 8,
    featured: true,
    imageIndex: 0,
  },
  {
    title: "Mastering the Butterfly Move",
    slug: { current: "mastering-butterfly-move" },
    excerpt:
      "Step-by-step tutorial on how to perfect the iconic butterfly dance move popularized in Caribbean dance.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "The butterfly move is one of the most recognizable dance moves in Caribbean dance culture. This tutorial will break down the technique step by step.",
          },
        ],
        style: "normal",
      },
    ],
    publishedAt: new Date("2024-01-20"),
    readTime: 12,
    featured: false,
    imageIndex: 1,
  },
  {
    title: "Interview: Queen of Dancehall",
    slug: { current: "interview-queen-dancehall" },
    excerpt:
      "Exclusive interview with one of Jamaica's most influential dancehall queens about her journey and impact.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "In this exclusive interview, we sit down with one of Jamaica's most influential dancehall queens to discuss her journey, challenges, and the future of dancehall culture.",
          },
        ],
        style: "normal",
      },
    ],
    publishedAt: new Date("2024-01-25"),
    readTime: 15,
    featured: true,
    imageIndex: 2,
  },
  {
    title: "Caribbean Dance Festivals 2024",
    slug: { current: "caribbean-dance-festivals-2024" },
    excerpt:
      "Your complete guide to the biggest Caribbean dance festivals happening this year.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "From Jamaica to Trinidad, the Caribbean is home to some of the most vibrant dance festivals in the world. Here's your complete guide to the biggest events happening in 2024.",
          },
        ],
        style: "normal",
      },
    ],
    publishedAt: new Date("2024-02-01"),
    readTime: 6,
    featured: false,
    imageIndex: 3,
  },
  {
    title: "Nutrition for Dancers",
    slug: { current: "nutrition-for-dancers" },
    excerpt:
      "Essential nutrition tips and meal plans designed specifically for Caribbean dancers.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Proper nutrition is crucial for dancers to maintain energy, strength, and flexibility. This guide provides essential nutrition tips and meal plans designed specifically for Caribbean dancers.",
          },
        ],
        style: "normal",
      },
    ],
    publishedAt: new Date("2024-02-05"),
    readTime: 10,
    featured: false,
    imageIndex: 4,
  },
  {
    title: "The Evolution of Soca Dance",
    slug: { current: "evolution-soca-dance" },
    excerpt:
      "How soca dance has evolved from traditional Caribbean rhythms to modern fusion styles.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Soca dance has evolved significantly from its traditional Caribbean roots. This article explores how modern soca dance incorporates elements from hip-hop, contemporary, and other global dance styles.",
          },
        ],
        style: "normal",
      },
    ],
    publishedAt: new Date("2024-02-10"),
    readTime: 14,
    featured: true,
    imageIndex: 5,
  },
];

async function addArticlesWithImages() {
  try {
    console.log("🖼️  Uploading images to Sanity...");

    // Upload all images first
    const imageIds = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imageId = await uploadImage(
        imageUrls[i],
        `article-image-${i + 1}.jpg`
      );
      imageIds.push(imageId);
    }

    console.log("📝 Creating articles with images...");

    // Create articles with image references
    for (const article of articles) {
      const { imageIndex, ...articleData } = article;

      const articleWithImage = {
        ...articleData,
        mainImage: imageIds[imageIndex]
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageIds[imageIndex],
              },
            }
          : null,
      };

      const result = await client.create({
        _type: "article",
        ...articleWithImage,
      });

      console.log(
        `✅ Added article with image: ${article.title} (ID: ${result._id})`
      );
    }

    console.log("🎉 All articles with images added successfully!");
  } catch (error) {
    console.error("❌ Error adding articles with images:", error);
  }
}

addArticlesWithImages();
