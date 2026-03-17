import {defineField, defineType, type StringRule, type SlugRule, type TextRule, type ImageRule, type ArrayRule, type DatetimeRule, type ReferenceRule, type NumberRule, type UrlRule} from 'sanity'
import {Video} from 'lucide-react'

export default defineType({
  name: 'tutorial',
  title: 'Dance Tutorial',
  type: 'document',
  icon: Video,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Catchy title for the dance tutorial',
      validation: (Rule: StringRule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the URL path',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the tutorial (appears in previews)',
      validation: (Rule: TextRule) => Rule.required().min(50).max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Primary image for the tutorial',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette', 'exif'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (Rule: StringRule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Appears below the image',
        }),
      ],
      validation: (Rule: ImageRule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Tutorial Content',
      type: 'array',
      description: 'The main content of the tutorial',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Step', value: 'h4'},
            {title: 'Tip', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        defineField({
          type: 'image',
          name: 'stepImage',
          title: 'Step Image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule: StringRule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
      ],
      validation: (Rule: ArrayRule<unknown[]>) => Rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When the tutorial was published',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: DatetimeRule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Instructor',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Who is teaching this tutorial?',
      validation: (Rule: ReferenceRule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      description: 'How challenging is this tutorial?',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'danceStyle',
      title: 'Dance Style',
      type: 'string',
      description: 'What style of dance is this tutorial for?',
      options: {
        list: [
          {title: 'Dancehall', value: 'dancehall'},
          {title: 'Soca', value: 'soca'},
          {title: 'Reggae', value: 'reggae'},
          {title: 'Afrobeat', value: 'afrobeat'},
          {title: 'Hip Hop', value: 'hip-hop'},
          {title: 'Contemporary', value: 'contemporary'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to the tutorial video (YouTube, Vimeo, etc.)',
      validation: (Rule: UrlRule) => Rule.uri({
        scheme: ['http', 'https', 'vimeo', 'youtube'],
      }),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'Length of the tutorial in minutes',
      initialValue: 10,
      validation: (Rule: NumberRule) => Rule.required().min(1).max(240).integer(),
    }),
    defineField({
      name: 'tutorialOrder',
      title: 'Tutorial Order',
      type: 'number',
      description: 'Order in which this tutorial appears in the tutorials section (1 = first)',
      initialValue: 1,
      validation: (Rule: NumberRule) => Rule.required().min(1).max(100).integer(),
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Any skills or knowledge needed before starting this tutorial',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'equipment',
      title: 'Required Equipment',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Any equipment needed for this tutorial',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'For SEO (keep under 160 characters)',
      validation: (Rule: TextRule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      difficulty: 'difficulty',
      danceStyle: 'danceStyle',
    },
    prepare(selection) {
      const {author, difficulty, danceStyle} = selection
      return {
        ...selection,
        subtitle: [
          author && `by ${author}`,
          difficulty && `• ${difficulty}`,
          danceStyle && `• ${danceStyle}`,
        ]
          .filter(Boolean)
          .join(' '),
      }
    },
  },
  orderings: [
    {
      title: 'Tutorial Order',
      name: 'tutorialOrderAsc',
      by: [{field: 'tutorialOrder', direction: 'asc'}],
    },
    {
      title: 'Publish Date, Newest First',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Difficulty, Easy to Hard',
      name: 'difficultyAsc',
      by: [{field: 'difficulty', direction: 'asc'}],
    },
  ],
})
