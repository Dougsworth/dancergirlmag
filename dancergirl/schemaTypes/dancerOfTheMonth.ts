import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'dancerOfTheMonth',
  title: '🌟 Dancer of the Month Features',
  type: 'document',
  fieldsets: [
    {
      name: 'basics',
      title: '📋 Basic Information',
      options: { collapsible: false }
    },
    {
      name: 'content',
      title: '📝 Story & Content',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'media',
      title: '📸 Photos & Videos',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'achievements',
      title: '🏆 Achievements & Recognition',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'settings',
      title: '⚙️ Display & Settings',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'seo',
      title: '🔍 Search Engine & Social Media',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'dancerName',
      title: 'Dancer\'s Name 💃',
      type: 'string',
      fieldset: 'basics',
      validation: (Rule) => Rule.required().error('Please enter the dancer\'s name'),
      description: 'Enter the full name of the featured dancer',
    }),
    defineField({
      name: 'month',
      title: 'Which Month? 📅',
      type: 'string',
      fieldset: 'basics',
      options: {
        list: [
          { title: 'January', value: 'January' },
          { title: 'February', value: 'February' },
          { title: 'March', value: 'March' },
          { title: 'April', value: 'April' },
          { title: 'May', value: 'May' },
          { title: 'June', value: 'June' },
          { title: 'July', value: 'July' },
          { title: 'August', value: 'August' },
          { title: 'September', value: 'September' },
          { title: 'October', value: 'October' },
          { title: 'November', value: 'November' },
          { title: 'December', value: 'December' },
        ],
      },
      validation: (Rule) => Rule.required().error('Please select the month for this feature'),
      description: 'Choose which month this dancer will be featured',
    }),
    defineField({
      name: 'year',
      title: 'What Year? 📆',
      type: 'number',
      fieldset: 'basics',
      validation: (Rule) => Rule.required().min(2020).max(2030).error('Year must be between 2020-2030'),
      description: 'Enter the year for this feature (e.g., 2024)',
    }),
    defineField({
      name: 'slug',
      title: 'Website Link (Auto-Generated) 🔗',
      type: 'slug',
      fieldset: 'basics',
      options: {
        source: (doc: any) => `${doc.dancerName || 'dancer'}-${doc.month}-${doc.year}`.toLowerCase(),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Click "Generate" to create the website link'),
      description: 'This creates the web address for this dancer feature page. Click "Generate" after entering the name, month, and year.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links 📱',
      type: 'array',
      fieldset: 'basics',
      of: [
        {
          type: 'object',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: '📷 Instagram', value: 'instagram' },
                  { title: '📺 YouTube', value: 'youtube' },
                  { title: '🎵 TikTok', value: 'tiktok' },
                  { title: '🐦 Twitter', value: 'twitter' },
                  { title: '🌐 Website', value: 'website' },
                ],
              },
            },
            {
              name: 'url',
              title: 'Link',
              type: 'url',
              description: 'Paste the full link (e.g., https://instagram.com/username)',
            },
          ],
        },
      ],
      description: 'Add the dancer\'s social media links (optional)',
    }),
    defineField({
      name: 'featuredStory',
      title: 'Tell Their Story 📝',
      type: 'blockContent',
      fieldset: 'content',
      validation: (Rule) => Rule.required().error('Please write the dancer\'s story'),
      description: 'Write the main article about this dancer. Include their background, journey, achievements, and what makes them special. This will be the main content visitors read.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Preview Text 💬',
      type: 'text',
      fieldset: 'content',
      rows: 3,
      validation: (Rule) => Rule.required().max(300).error('Please write a short preview (under 300 characters)'),
      description: 'Write a brief, engaging preview that will appear in the dancer list and social media. Think of this as the "hook" to get people interested. Keep it under 300 characters.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Main Cover Photo 📸',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Please upload a main photo'),
      description: 'Choose the best photo of this dancer - this will be the big image people see first on their feature page. High quality photos work best!',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Describe the Photo',
          description: 'Briefly describe what\'s in the photo (e.g., "Dancer performing at carnival"). This helps with accessibility and search engines.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Photo Caption (Optional)',
          description: 'Add a caption that will appear with the photo if needed',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery 🖼️',
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
      description: 'Add more photos of this dancer! These could be performance shots, behind-the-scenes, rehearsal photos, or any other great images that showcase their talent.',
    }),
    defineField({
      name: 'categories',
      title: 'What Dance Styles? 🕺',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Dancehall', value: 'Dancehall' },
          { title: 'Soca', value: 'Soca' },
          { title: 'Reggae', value: 'Reggae' },
          { title: 'Afrobeats', value: 'Afrobeats' },
          { title: 'Contemporary', value: 'Contemporary' },
          { title: 'Traditional', value: 'Traditional' },
          { title: 'Choreography', value: 'Choreography' },
          { title: 'Performance', value: 'Performance' },
          { title: 'Cultural Dance', value: 'Cultural Dance' },
          { title: 'Heritage', value: 'Heritage' },
        ],
        layout: 'tags',
      },
      description: 'Select all the dance styles this dancer is known for. You can pick multiple styles - this helps visitors find dancers they\'re interested in.',
    }),
    defineField({
      name: 'achievements',
      title: 'Awards & Achievements 🏆',
      type: 'array',
      fieldset: 'achievements',
      of: [
        {
          type: 'object',
          title: 'Achievement',
          fields: [
            {
              name: 'achievement',
              title: 'What did they achieve?',
              type: 'string',
              description: 'E.g., "First Place at Caribbean Dance Competition"',
            },
            {
              name: 'year',
              title: 'What year?',
              type: 'number',
              description: 'When did this happen? (Optional)',
            },
            {
              name: 'description',
              title: 'Tell us more about it',
              type: 'text',
              rows: 2,
              description: 'Add more details about this achievement - what made it special?',
            },
          ],
        },
      ],
      description: 'List all the amazing things this dancer has accomplished - awards, competitions, performances, milestones, etc. These will be displayed beautifully on their feature page!',
    }),
    defineField({
      name: 'videoHighlights',
      title: 'Video Highlights 🎥',
      type: 'array',
      fieldset: 'media',
      of: [
        {
          type: 'object',
          title: 'Video',
          fields: [
            {
              name: 'title',
              title: 'Video Title',
              type: 'string',
              description: 'Give this video a catchy title',
            },
            {
              name: 'videoUrl',
              title: 'Video Link',
              type: 'url',
              description: 'Paste the full link from YouTube, TikTok, Instagram, or any other video platform',
            },
            {
              name: 'thumbnail',
              title: 'Video Thumbnail (Optional)',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload a custom thumbnail image, or leave blank to use the video\'s default thumbnail',
            },
            {
              name: 'description',
              title: 'What\'s in this video?',
              type: 'text',
              rows: 2,
              description: 'Describe what viewers will see in this video',
            },
          ],
        },
      ],
      description: 'Add videos that showcase this dancer\'s best work! These could be performances, tutorials, behind-the-scenes footage, or interviews.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'When to Publish? 📅',
      type: 'datetime',
      fieldset: 'settings',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Please set a publish date'),
      description: 'Choose when this dancer feature should go live on the website. You can set it for the future to schedule it!',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Make This the Main Featured Dancer? 🌟',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: false,
      description: 'Turn this ON to make this dancer appear prominently on the homepage and at the top of the dancers list. Only turn this on for the current month\'s main feature!',
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website? 👀',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: true,
      description: 'Turn this OFF to hide this dancer feature from the website (useful for drafts or if you need to temporarily remove it)',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Search Engine Title (Optional) 🔍',
      type: 'string',
      fieldset: 'seo',
      description: 'This is what appears in Google search results. If left blank, we\'ll use the dancer\'s name and month automatically.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search Engine Description (Optional) 📝',
      type: 'text',
      rows: 2,
      fieldset: 'seo',
      description: 'This short description appears under the title in Google search results. Keep it under 160 characters and make it exciting to get more clicks! If left blank, we\'ll use the excerpt.',
    }),
  ],
  preview: {
    select: {
      title: 'dancerName',
      subtitle: 'month',
      year: 'year',
      media: 'featuredImage',
      isActive: 'isActive',
      isFeatured: 'isFeatured'
    },
    prepare(selection) {
      const { title, subtitle, year, media, isActive, isFeatured } = selection;
      const status = !isActive ? '🚫 Hidden' : isFeatured ? '⭐ Currently Featured' : '✅ Published';
      return {
        title: `${title || 'Unknown Dancer'} - ${subtitle} ${year}`,
        subtitle: `${status} • Dancer of the Month`,
        media,
      };
    },
  },
});