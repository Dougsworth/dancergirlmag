import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroVideo',
  title: 'Hero Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Display name for the video (e.g., "MLM", "Tinashe", "Ballet")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fallbackTitle',
      title: 'Fallback Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Fallback title if YouTube data fails to load (e.g., "MLM Dance Performance")',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'YouTube video ID (e.g., "ntS0hequ388" from https://www.youtube.com/watch?v=ntS0hequ388)',
    }),
    defineField({
      name: 'articleSlug',
      title: 'Article Slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Slug for the related article (e.g., "mlm-dance")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Order in which this video appears in the hero rotation (0 = first)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this video should be included in the hero rotation',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      description: 'Optional custom thumbnail (YouTube thumbnail will be used if not provided)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description for the video',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Created (Newest first)',
      name: 'createdAtDesc',
      by: [
        { field: 'createdAt', direction: 'desc' }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      fallbackTitle: 'fallbackTitle',
      media: 'thumbnail',
      order: 'order',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, fallbackTitle, order, isActive } = selection;
      const status = isActive ? '✅' : '❌';
      return { 
        title: `${status} ${title}`,
        subtitle: `Order: ${order} • ${fallbackTitle}`,
        media: selection.media,
      };
    },
  },
})