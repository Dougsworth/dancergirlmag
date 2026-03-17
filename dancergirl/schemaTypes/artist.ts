import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artist',
  title: '💃 Dancers & Artists',
  type: 'document',
  fieldsets: [
    {
      name: 'basics',
      title: '📝 Basic Profile Info',
      options: { collapsible: false }
    },
    {
      name: 'media',
      title: '📸 Photos & Gallery',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'social',
      title: '📱 Social Media Links',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'settings',
      title: '⚙️ Display Settings',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Dancer\'s Full Name 📛',
      type: 'internationalizedString',
      fieldset: 'basics',
      validation: (Rule) => Rule.required().error('Please enter the dancer\'s name'),
      description: 'Enter the dancer\'s full name as they want it to appear on the website',
    }),
    defineField({
      name: 'slug',
      title: 'Website Link (Auto-Generated) 🔗',
      type: 'slug',
      fieldset: 'basics',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Click "Generate" to create the website link'),
      description: 'This creates the web address for this dancer\'s profile page. Click "Generate" after entering their name.',
    }),
    defineField({
      name: 'bio',
      title: 'Tell Their Story 📝',
      type: 'internationalizedBlockContent',
      fieldset: 'basics',
      description: 'Write about this dancer - their background, style, achievements, what makes them special. This appears on their profile page.',
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo 📷',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Please upload a profile photo'),
      description: 'Choose a great headshot or performance photo that represents this dancer. This will be their main profile picture throughout the website.',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Collection 🖼️',
      type: 'array',
      fieldset: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Describe This Photo',
              description: 'What\'s happening in this photo? (helps with accessibility)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Photo Caption (Optional)',
              description: 'Add a fun caption if you want',
            },
          ],
        },
      ],
      description: 'Add more photos of this dancer! Include performance shots, rehearsal photos, behind-the-scenes moments, or any other great images that showcase their talent and personality.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media & Website 📱',
      type: 'array',
      fieldset: 'social',
      of: [
        {
          type: 'object',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              title: 'Which Platform?',
              type: 'string',
              options: {
                list: [
                  { title: '📷 Instagram', value: 'instagram' },
                  { title: '📺 YouTube', value: 'youtube' },
                  { title: '🎵 TikTok', value: 'tiktok' },
                  { title: '🐦 Twitter', value: 'twitter' },
                  { title: '🌐 Personal Website', value: 'website' },
                ],
              },
              description: 'Choose the social media platform',
            },
            {
              name: 'url',
              title: 'Link Address',
              type: 'url',
              description: 'Paste the full link to their profile (e.g., https://instagram.com/username)',
            },
          ],
        },
      ],
      description: 'Add links to this dancer\'s social media profiles and website. These will appear as clickable buttons on their profile page.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Highlight This Dancer? 🌟',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: false,
      description: 'Turn this ON to feature this dancer prominently on the website (homepage, top of lists, etc.). Use sparingly for your best dancers!',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      media: 'image',
      isFeatured: 'isFeatured',
    },
    prepare(selection) {
      const { title, media, isFeatured } = selection;
      return {
        title: title || 'Unnamed Dancer',
        subtitle: isFeatured ? '⭐ Featured Dancer' : 'Dancer Profile',
        media,
      };
    },
  },
});
