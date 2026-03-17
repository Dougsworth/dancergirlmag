import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive title for the image',
      validation: (Rule) => Rule.required().min(5).max(100),
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette', 'exif', 'location'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
        defineField({
          name: 'credit',
          type: 'string',
          title: 'Photo Credit',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A detailed description of the image',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      description: 'Categorize this image for filtering',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Add relevant keywords',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Show this image in featured galleries',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where was this photo taken?',
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'reference',
      to: {type: 'author'},
      description: 'Who took this photo?',
    }),
    defineField({
      name: 'usageRights',
      title: 'Usage Rights',
      type: 'string',
      options: {
        list: [
          {title: 'All Rights Reserved', value: 'all-rights-reserved'},
          {title: 'Creative Commons', value: 'creative-commons'},
          {title: 'Public Domain', value: 'public-domain'},
          {title: 'Editorial Use Only', value: 'editorial-use'},
        ],
      },
      initialValue: 'all-rights-reserved',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for SEO (keep under 60 chars)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Description for SEO (keep under 160 chars)',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      photographer: 'photographer.name',
      date: 'dateTaken',
    },
    prepare(selection) {
      const {photographer, date} = selection
      return {
        ...selection,
        subtitle: [photographer, date].filter(Boolean).join(' • '),
      }
    },
  },
  orderings: [
    {
      title: 'Date Taken, New',
      name: 'dateTakenDesc',
      by: [{field: 'dateTaken', direction: 'desc'}],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})