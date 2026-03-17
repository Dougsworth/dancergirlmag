const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'f37vktt0', // Your project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to set this
  useCdn: false,
});

async function addAddisonMorgan() {
  try {
    console.log('🚀 Adding Addison Morgan to Dancers of the Month...');

    // Create Addison Morgan as an artist/dancer
    const addisonMorgan = {
      _type: 'artist',
      name: {
        en: 'Addison Morgan',
        es: 'Addison Morgan'
      },
      slug: {
        _type: 'slug',
        current: 'addison-morgan'
      },
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Addison Morgan is a rising star in Caribbean dance, known for her dynamic performances and innovative choreography. Her signature move with flowing fabric has captivated audiences worldwide, earning her recognition as one of the most promising dancers of her generation.',
            },
          ],
        },
      ],
      // Note: You'll need to upload the actual image to Sanity and get the asset reference
      // For now, this is a placeholder
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-ADDISON-MORGAN-PROFILE' // This will need to be replaced with actual asset reference
        }
      },
      gallery: [
        {
          _key: 'addison-fabric-1',
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-ADDISON-FABRIC-1' // Replace with actual asset reference
          },
          alt: 'Addison Morgan throwing fabric in dynamic pose',
          caption: 'Addison Morgan performing her signature fabric movement'
        },
        {
          _key: 'addison-fabric-2',
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-ADDISON-FABRIC-2' // Replace with actual asset reference
          },
          alt: 'Addison Morgan in blue dress with fabric',
          caption: 'Addison in her iconic blue dress with flowing fabric'
        },
        {
          _key: 'addison-performance-1',
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-ADDISON-PERFORMANCE-1' // Replace with actual asset reference
          },
          alt: 'Addison Morgan performing on stage',
          caption: 'Live performance at Caribbean Dance Festival 2024'
        }
      ],
      socialLinks: [
        {
          platform: 'instagram',
          url: 'https://instagram.com/addisonmorgan'
        },
        {
          platform: 'youtube',
          url: 'https://youtube.com/@addisonmorgan'
        },
        {
          platform: 'tiktok',
          url: 'https://tiktok.com/@addisonmorgan'
        }
      ],
      isFeatured: true
    };

    const result = await client.create(addisonMorgan);
    console.log('✅ Successfully added Addison Morgan:', result._id);
    console.log('📸 Profile image and gallery images need to be uploaded to Sanity');
    console.log('🔗 You can view her at: /dancers/addison-morgan');

    console.log('\n📋 Next Steps:');
    console.log('1. Upload Addison\'s photos to Sanity Studio');
    console.log('2. Update the image asset references in this script');
    console.log('3. Run this script again with the correct asset references');
    console.log('4. Add more dancers to the Dancers of the Month series');

  } catch (error) {
    console.error('❌ Error adding Addison Morgan:', error);
  }
}

// Run the script
addAddisonMorgan(); 