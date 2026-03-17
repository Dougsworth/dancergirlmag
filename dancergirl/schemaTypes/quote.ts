import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Dancer Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      validation: Rule => Rule.required().min(10).max(300)
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title/Description',
      type: 'string',
      placeholder: 'e.g., Professional Soca Dancer, Choreographer'
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Quote',
      type: 'boolean',
      description: 'Display this quote prominently on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Light Pink', value: 'light-pink' },
          { title: 'Dark', value: 'dark' },
          { title: 'White', value: 'white' },
          { title: 'Gradient Pink', value: 'gradient-pink' }
        ]
      },
      initialValue: 'gradient-pink'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    })
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'author',
      media: 'authorImage'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title?.substring(0, 60) + (title?.length > 60 ? '...' : ''),
        subtitle: `by ${subtitle}`
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})