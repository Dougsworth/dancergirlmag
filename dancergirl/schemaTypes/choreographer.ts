import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'choreographer',
  title: 'Choreographer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      description: 'A brief biography of the choreographer',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
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
    }),
    defineField({
      name: 'specialties',
      title: 'Dance Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'What dance styles does this choreographer specialize in?',
    }),
    defineField({
      name: 'featuredWork',
      title: 'Featured Work',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Work Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'Link to video of this work',
            },
            {
              name: 'image',
              title: 'Work Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'year',
              title: 'Year Created',
              type: 'number',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Choreographer',
      type: 'boolean',
      initialValue: false,
      description: 'Show this choreographer in the featured section',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this choreographer appears in lists',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
      specialties: 'specialties',
    },
    prepare(selection) {
      const { title, media, specialties } = selection
      return { 
        title, 
        subtitle: specialties ? specialties.join(', ') : 'No specialties listed',
        media 
      }
    },
  },
}) 