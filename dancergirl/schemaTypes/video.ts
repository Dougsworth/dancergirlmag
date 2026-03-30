import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video platform URL',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
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
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Music', value: 'music' },
          { title: 'Dance', value: 'dance' },
          { title: 'Interview', value: 'interview' },
          { title: 'Behind the Scenes', value: 'behind-the-scenes' },
        ],
      },
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'artist',
      title: 'Artist/Dancer',
      type: 'string',
      description: 'Name of the artist or dancer in the video',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'danceStyle',
      title: 'Dance Style',
      type: 'string',
      options: {
        list: [
          { title: 'Afrobeats', value: 'afrobeats' },
          { title: 'Dancehall', value: 'dancehall' },
          { title: 'Hip Hop', value: 'hiphop' },
          { title: 'Contemporary', value: 'contemporary' },
          { title: 'Traditional', value: 'traditional' },
          { title: 'Fusion', value: 'fusion' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      duration: 'duration',
      artist: 'artist.name',
    },
    prepare(selection) {
      const { duration, artist } = selection
      const minutes = duration ? Math.floor(duration / 60) : 0
      const seconds = duration ? duration % 60 : 0
      const subtitle = [
        duration ? `${minutes}:${seconds.toString().padStart(2, '0')}` : 'No duration',
        artist ? `by ${artist}` : ''
      ].filter(Boolean).join(' • ')
      
      return { 
        ...selection, 
        subtitle: subtitle || 'Video'
      }
    },
  },
})