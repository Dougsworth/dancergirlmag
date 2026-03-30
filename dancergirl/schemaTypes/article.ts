import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'article',
  title: '📰 Articles & Stories',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'content',
      title: '📝 Write Your Article',
      default: true,
    },
    {
      name: 'media',
      title: '📸 Photos & Images',
    },
    {
      name: 'publishing',
      title: '🚀 Publish & Promote',
    },
    {
      name: 'relationships',
      title: '🔗 Related Articles',
    },
    {
      name: 'seo',
      title: '🔍 Search & Social Media',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Article Headline ✨',
      type: 'string',
      description: 'Write a catchy headline that will grab readers\' attention. This appears at the top of your article and in search results.',
      group: 'content',
      validation: (Rule) => Rule.required().error('Every article needs a great headline!'),
    }),
    defineField({
      name: 'slug',
      title: 'Website Link (Auto-Generated) 🔗',
      type: 'slug',
      description: 'This creates the web address for your article. Click "Generate" after writing your headline.',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Click "Generate" to create the website link'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Article Preview 💬',
      type: 'text',
      rows: 3,
      description: 'Write a short, exciting preview that will make people want to read your full article. This appears on the homepage and in article lists.',
      group: 'content',
      validation: (Rule) => Rule.required().error('Please write a preview'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Photo 🖼️',
      type: 'image',
      description: 'Choose a stunning photo that represents your article. This will be the main image people see when browsing articles. High-quality photos get more clicks!',
      group: 'media',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Every article needs a great cover photo!'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'When to Publish? 📅',
      type: 'datetime',
      description: 'Set when this article goes live on the website. You can schedule it for the future! Defaults to right now.',
      group: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Please set a publish date'),
    }),
    defineField({
      name: 'author',
      title: 'Who Wrote This? ✍️',
      type: 'string',
      description: 'Enter the author\'s name.',
      group: 'content',
    }),
    defineField({
      name: 'section',
      title: 'Which Section? 📂',
      type: 'string',
      description: 'Choose which part of the site this article belongs to.',
      group: 'content',
      options: {
        list: [
          { title: 'Money Moves', value: 'money-moves' },
          { title: 'Choreographers Corner', value: 'choreographers-corner' },
          { title: 'Dancers: Speak Up', value: 'dancer-speak-up' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Please choose a section'),
    }),
    defineField({
      name: 'body',
      title: 'Write Your Article 📝',
      type: 'blockContent',
      description: 'This is where you write the full article! You can add text, images, videos, quotes, and more. Use the toolbar to format your text and make it look great.',
      group: 'content',
      validation: (Rule) => Rule.required().error('Your article needs content!'),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage? 🌟',
      type: 'boolean',
      description: 'Turn this ON to make this article appear in the special "Featured Articles" section on the homepage. Great for your best content!',
      group: 'publishing',
      initialValue: false,
    }),
    defineField({
      name: 'trending',
      title: 'Mark as Trending? 🔥',
      type: 'boolean',
      description: 'Turn this ON to add a "Trending" badge and boost this article\'s visibility. Perfect for hot topics and popular content!',
      group: 'publishing',
      initialValue: false,
    }),
    defineField({
      name: 'metaTitle',
      title: 'Google Search Title (Optional) 🔍',
      type: 'string',
      description: 'Want a different title to appear in Google? Enter it here. Otherwise, we\'ll use your article headline. Keep it under 60 characters.',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best Google results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Google Search Description (Optional) 💬',
      type: 'text',
      rows: 2,
      description: 'This appears under your article title in Google search results. Make it compelling to get more clicks! Keep under 160 characters. If blank, we\'ll use your article preview.',
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best Google results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Media Sharing Photo (Optional) 📱',
      type: 'image',
      description: 'Want a special photo for when people share this on Facebook, Instagram, etc.? Upload it here! Otherwise, we\'ll use your cover photo. Best size: 1200x630 pixels.',
      group: 'seo',
      options: {hotspot: true},
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Suggest Similar Articles (Optional) 🔗',
      type: 'array',
      description: 'Choose other articles that readers might enjoy after this one. This helps keep people on your website longer!',
      group: 'relationships',
      of: [{type: 'reference', to: {type: 'article'}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {author, publishedAt} = selection
      return {
        ...selection,
        subtitle: author && publishedAt
          ? `by ${author} • ${new Date(publishedAt).toLocaleDateString()}`
          : '',
      }
    },
  },
  orderings: [
    {
      title: 'Publish Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Publish Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})